

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";



import { Request, Response, NextFunction } from "express";

export const adminDeleteDocumentController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any>  => {
    try {     
        const {docToDelete}= req.params
        console.log("my id ", docToDelete);
        
        const response= await Document.findByIdAndDelete({_id:docToDelete})
        return res.status(200).json({message:"The document successfully Deleted",success:true,data:response})
    
    } catch (error) {
      next(error);
    }
  };
};
