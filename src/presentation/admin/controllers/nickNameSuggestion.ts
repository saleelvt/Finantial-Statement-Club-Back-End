import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";

export const adminGetNicknamesSuggestionsController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { name, language } = req.query;
 console.log('hhhhhhhhhd@@@@@@@@@@@hh',name,language);
 
      // Validate the input
      if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Name is required and must be a string." });
      }

      // Suggestions variable
      let suggestions: string[] = [];

      // Handle Arabic language logic
      if (language === "Arabic") {
        const searchQuery = {
          tadawalCode: { $regex: name, $options: "i" },
        };

        // Fetch suggestions from the ArabicDocument collection
        suggestions = await ArabicDocument.find(searchQuery)
          .limit(10)
          .distinct("tadawalCode");

      // Handle English language logic
      } else if (language === "English") {
        const searchQuery = {
          tadawalCode: { $regex: name, $options: "i" },
        };

        // Fetch suggestions from the Document collection
        suggestions = await Document.find(searchQuery)
          .limit(10)
          .distinct("tadawalCode");
      } else {
        // If language is neither Arabic nor English
        return res.status(400).json({ message: "Invalid admin language provided." });
      }

      // Return suggestions
      return res.status(200).json({ suggestions });
    } catch (error) {
      next(error);
    }
  };
};
