import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] }; // Extend Request object to handle file uploads
}

export const adminAddDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
    console.log('___________', req.body);
    
    try {
  

     const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body; 
     console.log("this is my req.files ", req.files, fullNameEn,nickNameEn);

     if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }
    const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
    const fileUrls: Record<string, { file: string; date: Date; year: string }> = {};

     for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];
        if (!fileArray || fileArray.length === 0) {
          return res.status(400).json({ success: false, message: `${fieldKey} file is missing` });
        }

        const file = fileArray[0];
        const s3Url = await uploadFileToS3(file.buffer, file.originalname);

        const date = new Date(req.body[`${fieldKey}Date`]);
        const year = req.body[`${fieldKey}Year`];

        fileUrls[fieldKey] = {
          file: s3Url,
          date,
          year,
        };
      }

      const newDocument = new Document({
        fullNameEn,
        nickNameEn,
        tadawalCode,
        sector,
        formData: fileUrls,
      });

      await newDocument.save();
     console.log("document success fully save macha ", newDocument);
    await newDocument.save();
     
      res.status(200).json({
        success: true,
        message: "Document created successfully",
        data: newDocument,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ success: false, message: "An error occurred while creating the document" });
    }
  };
};
