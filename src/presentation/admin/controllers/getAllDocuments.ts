import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetAllDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      // Parse skip and limit from query params
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 300;

      // Fetch paginated documents
      const documents = await Document.find()
        .sort({ createdAt: 1 }) // optional: you can sort by newest if needed
        .skip(skip)
        .limit(limit);

      if (!documents) {
        return res.status(404).json({ success: false, message: "NOT FOUND" });
      }

      return res.status(200).json({ success: true, data: documents });
    } catch (error) {
      next(error);
    }
  };
};
