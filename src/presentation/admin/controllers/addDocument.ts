import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";

import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";

export const adminAddDocumentController = ( dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any> => {
    try {
      const bodyData = req.body;
      if (!bodyData)
        return res
          .status(403)
          .json({ success: false, message: "The Document data missing" });
      console.log(bodyData);

      const existingDocument = await Document.findOne({
        yearOfReport: bodyData.yearOfReport,
      });
      if (existingDocument) {
        return res
          .status(409)
          .json({
            success: false,
            message: "A document with this yearOfReport already exists",
          });
      }
      
      const newDocument = await Document.create(bodyData);
      return res.status(200).json({ success: true, message: "Document created successfully", data: newDocument });
      
    } catch (error) {
        console.error("Error creating document:", error);
        return res.status(500).json({ success: false, message: "An error occurred while creating the document" });
    }
  };
};
