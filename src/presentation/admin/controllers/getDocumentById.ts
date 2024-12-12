
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetDocumentByIdController = (
  dependencies: IAdminDependencies
) => {
  return async ( req: Request, res: Response,next: NextFunction): Promise<void | null | any> => {
    try {
        const {  language } = req.query;
        const id = req.params.id;

        console.log("backend - ", id, language);
        if (!id || !language) {
          return res.status(400).json({
            success: false,
            message:
              "Missing required query parameters: id or userLanguage",
          });
        }
        let response;
        if (language === "Arabic") {
          response = await ArabicDocument.find({ _id: id });
          if (!response) {
            return res.status(404).json({
              success: false,
              message: "Document not found for the given Arabic id",
            });
          }
        } else if (language === "English") {
          response = await Document.find({ _id: id });
          if (!response) {
            return res.status(404).json({
              success: false,
              message: "Document not found for the given doc id ",
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid user language provided",
          });
        }
        return res.status(200).json({ success: true, data: response });
    
    } catch (error) {
      next(error);
    }
  };
};
