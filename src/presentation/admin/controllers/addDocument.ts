import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] }; // Extend Request object to handle file uploads
}

export const adminAddDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
      console.log("Request files: ", req.files, "Fields: ", fullNameEn, nickNameEn);

      // Default to empty values or null if fields are not provided
      const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
      const fileUrls: Record<string, { file: string | null; date: Date | null; year: string }> = {};

      // Process each required field
      for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];

        if (fileArray && fileArray.length > 0) {  
          // If file is present, upload it to S3
          const file = fileArray[0];
          const s3Url = await uploadFileToS3(file.buffer, file.originalname);

          // Optional fields: If missing, default to null or empty
          const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
          const year = req.body[`${fieldKey}Year`] || "";

          fileUrls[fieldKey] = {
            file: s3Url,
            date,
            year,
          };
        } else {
          // If file is missing, set it as null
          fileUrls[fieldKey] = {
            file: null,
            date: null,
            year: "",
          };
        }
      }

      // Create document object with fields that may have empty, null, or undefined values
      const newDocument = new Document({
        fullNameEn: fullNameEn || "", // Default to empty string if undefined or null
        nickNameEn: nickNameEn || "",
        tadawalCode: tadawalCode || "",
        sector: sector || "",
        formData: fileUrls, // Can contain empty or null fields
      });

      // Save the document to the database
      await newDocument.save();

      console.log("Document successfully saved: ", newDocument);

      // Send success response
      res.status(200).json({
        success: true,
        message: "Document created successfully",
        data: newDocument,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
