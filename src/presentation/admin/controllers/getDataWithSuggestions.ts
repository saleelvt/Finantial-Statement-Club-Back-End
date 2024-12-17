import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetDataWithSuggestionsController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { name, language } = req.query;
      if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Name is required and must be a string." });
      }
      
      // Suggestions variable
      let suggestions: string[] = [];
      if (language === "Arabic") {
        suggestions = await ArabicDocument.findOne({tadawalCode:name})
      } else if (language === "English") {
        suggestions = await Document.findOne({tadawalCode:name})
      } else {
        return res.status(400).json({ message: "Invalid admin language provided." });
      }
      // Return suggestions
      return res.status(200).json({message:"sugested data got ",data: suggestions });
    } catch (error) {
      next(error);
    }
  };
};
