import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const adminAddDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
      console.log("Request files: ", req.files, "Fields: ", fullNameEn, nickNameEn);

      const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
      const fileUrls: Record<string, { file: string | null; date: Date | null; year: string }> = {};

      // **Ensure all required fields have the same year before querying the database**
      const yearSet = new Set<string>();
      requiredFields.forEach((fieldKey) => {
        const year = req.body[`${fieldKey}Year`]?.trim();
        if (year) yearSet.add(year);
      });

      if (yearSet.size > 1) {
        console.log("Financial year mismatch detected.");
        return res.status(400).json({
          success: false,
          message: "All form data fields must have the same year.",
        });
      }

      // **Check if documents with the same Tadawal code already exist**
      const existDocuments = await Document.find({ tadawalCode: tadawalCode });
      if (existDocuments.length > 0) {
        console.log("Existing documents with Tadawal code: ", existDocuments);

        // Check each required field for a matching year
        for (const fieldKey of requiredFields) {
          const reqYear = req.body[`${fieldKey}Year`]?.trim();
          if (!reqYear) continue; // Skip if no year is provided

          for (const doc of existDocuments) {
            if (doc.formData?.[fieldKey]?.year === reqYear) {
              return res.status(400).json({
                success: false,
                message: `File with ${fieldKey} year ${reqYear} already exists in one of the documents.`,
              });
            }
          }
        }
      }
      
      // **Process file uploads**
      for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          const s3Url = await uploadFileToS3(file.buffer, file.originalname);
          const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
          const year = req.body[`${fieldKey}Year`] ? req.body[`${fieldKey}Year`].trim() : "";
          fileUrls[fieldKey] = { file: s3Url, date, year };
        } else {
          fileUrls[fieldKey] = { file: null, date: null, year: "" };
        }
      }

      // **Create and save the new document**
      const newDocument = new Document({
        fullNameEn: fullNameEn || "",
        nickNameEn: nickNameEn || "",
        tadawalCode: tadawalCode || "",
        sector: sector || "",
        formData: fileUrls,
      });

      await newDocument.save();
      res.status(200).json({ success: true, message: "Document created successfully", data: newDocument });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
