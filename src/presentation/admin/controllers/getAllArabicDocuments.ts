import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetAllArabicDocumentController = (
  dependencies: IAdminDependencies
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 300;

      const response = await ArabicDocument.find().skip(skip).limit(limit);

      if (!response || response.length === 0) {
        return res.status(200).json({ success: true, data: [] });
      }

      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  };
};
