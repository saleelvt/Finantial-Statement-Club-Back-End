

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";

import { Request, Response, NextFunction } from "express";

export const adminLogutController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('admin logout vann ');
        
        res.clearCookie("access_token");
      res.cookie("access_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  };
};
