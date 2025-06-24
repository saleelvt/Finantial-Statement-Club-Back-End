import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetAllDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
   try {
      // Fetch only selected fields
      const documents = await Document.find().select(
        "_id fullNameEn nickNameEn tadawalCode sector createdAt"
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
