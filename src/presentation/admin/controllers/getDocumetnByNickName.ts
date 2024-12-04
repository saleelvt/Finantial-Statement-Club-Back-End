import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetDocumetnByNickNameController = (
  dependencies: IAdminDependencies
) => {
  return async ( req: Request, res: Response,next: NextFunction): Promise<void | null | any> => {
    try {
        const { brandNickName, language } = req.query;

        console.log("backend - ", brandNickName, language);
        if (!brandNickName || !language) {
          return res.status(400).json({
            success: false,
            message:
              "Missing required query parameters: brandNickName or userLanguage",
          });
        }
        console.log("my params nick name ", brandNickName, language);
        let response;
        if (language === "Arabic") {
          response = await ArabicDocument.find({ nickNameAr: brandNickName });
          if (!response) {
            return res.status(404).json({
              success: false,
              message: "Document not found for the given Arabic nickname",
            });
          }
        } else if (language === "English") {
          response = await Document.find({ nickNameEn: brandNickName });
          if (!response) {
            return res.status(404).json({
              success: false,
              message: "Document not found for the given English nickname",
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
