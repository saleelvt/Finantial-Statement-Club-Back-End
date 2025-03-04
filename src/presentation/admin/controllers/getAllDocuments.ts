

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";

import { Request, Response, NextFunction } from "express";


export const adminGetAllDocumentController = (dependencies: IAdminDependencies)  => {
  return async (req: Request, res: Response, next: NextFunction) : Promise<void | null | any> => {
    try {
      
        const response= await Document.find()
        if(!response) res.status(404).json({success:false,message:"NOT FOUNT" })

            
        return res.status(200).json({success:true,data:response})
    } catch (error) {
      next(error);
    }
  };
};
