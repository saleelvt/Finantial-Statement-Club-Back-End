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
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
      
      console.log("the req.body of add document : ", fullNameEn, nickNameEn, tadawalCode, sector);
      
      const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
      const fileUrls: Record<string, { file: string; date: Date; year: string }> = {};

      // Check if at least one field has a file
      const hasAtLeastOneFile = Object.keys(req.files || {}).some(key => 
        requiredFields.includes(key) && req.files[key]?.length > 0
      );

      if (!hasAtLeastOneFile) {
        return res.status(400).json({
          success: false,
          message: "At least one file must be uploaded.",
        });
      }

      // Ensure all required fields have the same year before proceeding
      const yearSet = new Set<string>();
      const fieldsWithFiles: string[] = [];
      
      requiredFields.forEach((fieldKey) => {
        if (req.files[fieldKey]?.length > 0) {
          fieldsWithFiles.push(fieldKey);
          const year = req.body[`${fieldKey}Year`]?.trim();
          if (year) yearSet.add(year);
        }
      });

      if (yearSet.size === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one year must be specified for the uploaded files.",
        });
      }
      if (yearSet.size > 1) {
        return res.status(400).json({
          success: false,
          message: "All files must have the same year.",
        });
      }

      const currentYear = [...yearSet][0]; // The year for the current submission
      // Find existing document with the same tadawalCode
      const existingDocuments = await Document.find({ tadawalCode: tadawalCode });
      
      // Check if any field already exists with the same year in any document
      for (const fieldKey of fieldsWithFiles) {
        for (const doc of existingDocuments) {
          if (doc.formData?.[fieldKey]?.year === currentYear) {
            return res.status(400).json({
              success: false,
              message: `${fieldKey} for year ${currentYear} already exists in one of the documents.`,
            });
          }
        }
      }

      // Process file uploads
      for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          const s3Url = await uploadFileToS3(file.buffer, file.originalname);
          const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
          const year = req.body[`${fieldKey}Year`] ? req.body[`${fieldKey}Year`].trim() : "";
          fileUrls[fieldKey] = { file: s3Url, date, year };
        }
      }

      // Find if there's an existing document with the same tadawalCode and year
      let existingYearDocument = null;

      // Look for a document that already has this year in any field
      for (const doc of existingDocuments) {
        for (const field of requiredFields) {
          if (doc.formData?.[field]?.year === currentYear) {
            existingYearDocument = doc;
            break;
          }
        }
        if (existingYearDocument) break;
      }

      let result;

      if (existingYearDocument) {
        // Update existing document for the same year
        const formData = { ...existingYearDocument.formData };
        
        // Add the new fields to the existing document
        for (const fieldKey of fieldsWithFiles) {
          formData[fieldKey] = fileUrls[fieldKey];
        }

        // Update the document
        result = await Document.findByIdAndUpdate(
          existingYearDocument._id,
          { formData },
          { new: true }
        );

        res.status(200).json({ 
          success: true, 
          message: "Document updated successfully", 
          data: result 
        });
      } else {
        // Create a new document since there's no existing document with this year
        const newDocument = new Document({
          fullNameEn: fullNameEn || "",
          nickNameEn: nickNameEn || "",
          tadawalCode: tadawalCode || "",
          sector: sector || "",
          formData: fileUrls,
        });
        
        result = await newDocument.save();
        res.status(201).json({ 
          success: true, 
          message: "Document created successfully", 
          data: result 
        });
      }
    } catch (error) {
      console.error("Error creating/updating document:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
};