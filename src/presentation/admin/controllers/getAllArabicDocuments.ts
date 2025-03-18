

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

import { Request, Response, NextFunction } from "express";


export const adminGetAllArabicDocumentController = (dependencies: IAdminDependencies)  => {
  return async (req: Request, res: Response, next: NextFunction) : Promise<void | null | any> => {
    try {
        const response= await ArabicDocument.find()
        if(!response) res.status(404).json({success:false,message:"NOT FOUNT" })
          
        return res.status(200).json({success:true,data:response})
    } catch (error) {
      next(error);
    }
  };
};
