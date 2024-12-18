import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const adminAddDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void|null|any> => {
    try {
      const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
      console.log("Request files: ", req.files, "Fields: ", fullNameEn, nickNameEn);

      const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
      const fileUrls: Record<string, { file: string | null; date: Date | null; year: string }> = {};

      // Check if documents with the same Tadawal code already exist
      const existDocuments = await Document.find({ tadawalCode: tadawalCode });
      if (existDocuments.length > 0) {
        console.log("Existing documents with Tadawal code: ", existDocuments);

        // Check each document's formData.Q1.year against the current Q1Year
        const q1YearFromRequest = req.body["Q1Year"] || "";
        for (const doc of existDocuments) {
          if (doc.formData?.Q1?.year === q1YearFromRequest) {
            return res.status(400).json({
              success: false,
              message: `File with Q1 year ${q1YearFromRequest} already exists in one of the documents.`,
            });
          }
        }
      }

      // Process each required field
      for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];

        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          const s3Url = await uploadFileToS3(file.buffer, file.originalname);

          const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
          const year = req.body[`${fieldKey}Year`] || "";

          fileUrls[fieldKey] = {
            file: s3Url,
            date,
            year,
          };
        } else {
          fileUrls[fieldKey] = {
            file: null,
            date: null,
            year: "",
          };
        }
      }

      // Create the new document object
      const newDocument = new Document({
        fullNameEn: fullNameEn || "",
        nickNameEn: nickNameEn || "",
        tadawalCode: tadawalCode || "", 
        sector: sector || "",
        formData: fileUrls,
      });

      
      // Save the new document
      await newDocument.save();

      console.log("Document successfully saved: ", newDocument);

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
