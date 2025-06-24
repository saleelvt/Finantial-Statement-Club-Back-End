import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetAllArabicDocumentController = (
  dependencies: IAdminDependencies
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
         // Fetch only selected fields
         const documents = await ArabicDocument.find().select(
           "_id fullNameAr nickNameAr tadawalCode sector createdAt"
         );
   
         if (!documents || documents.length === 0) {
           return res.status(404).json({ success: false, message: "NOT FOUND" });
         }
   
         return res.status(200).json({ success: true, data: documents });
       } catch (error) {
         next(error);
       }
  };
};
