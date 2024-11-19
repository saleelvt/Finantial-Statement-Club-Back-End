import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";


interface CustomRequest extends Request {
  files: {
    fileAr?: Express.Multer.File[];
    fileEn?: Express.Multer.File[];
  };
}


export const adminAddDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { companyNameAr, companyNameEn, yearOfReport } = req.body;
      const existingDocument = await Document.findOne({ yearOfReport, companyNameEn: { $regex: new RegExp(`^${companyNameEn}$`, 'i') },});
      if (existingDocument) {
        return res.status(409).json({
          success: false,
          message: "A document with this yearOfReport already exists",
        });
      }
      console.log("this is my req.files ", req.files);
      

      // Create a new document instance and store files as binary data
      const newDocument = new Document({
        companyNameAr,
        companyNameEn,
        yearOfReport,
        fileAr: req.files?.fileAr
          ? { data: req.files.fileAr[0].buffer, contentType: req.files.fileAr[0].mimetype }
          : undefined,
        fileEn: req.files?.fileEn
          ? { data: req.files.fileEn[0].buffer, contentType: req.files.fileEn[0].mimetype }
          : undefined,
      });

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
