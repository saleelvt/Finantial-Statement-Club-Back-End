import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetAllDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
     

      // Fetch paginated documents
      const documents = await Document.find()
      

      if (!documents) {
        return res.status(404).json({ success: false, message: "NOT FOUND" });
      }

      return res.status(200).json({ success: true, data: documents });
    } catch (error) {
      next(error);
    }
  };
};
