

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { Request, Response, NextFunction } from "express";

export const adminDeleteDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any>  => {
    try {     
        const {docToDelete}= req.params
        const { language } = req.query;
      
       let response;

      if (language === "Arabic") {
        // Delete from ArabicDocument collection
        response = await ArabicDocument.findByIdAndDelete({ _id: docToDelete });
      } else {
        // Delete from Document collection
        response = await Document.findByIdAndDelete({ _id: docToDelete });
      }

      if (!response) {
        return res.status(404).json({ message: "Document not found", success: false });
      }
        return res.status(200).json({message:"The document successfully Deleted",success:true,data:response})
    
    } catch (error) {
      next(error);
    }
  };
};
