

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Otp } from "@/infrastructure/database/models/otpSchema";
import { Request, Response, NextFunction } from "express";
import { generateTokens } from "@/utilities/jwt/generateAccessToken";



export const verifyOtpController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { otp,email } = req.body;
 
      const dbOtp = await Otp.findOne({ email });
      
      if (dbOtp && otp === dbOtp.otp) {
     
        
        const { accessToken } = generateTokens(dbOtp._id.toString());
        console.log("the accessToken iws : ", accessToken);
        
        return res.status(200).json({
          message: "OTP verified successfully",
          success: true,
          accessToken:accessToken
        });
      }
       console.log("otp invalid");
       return res.status(400).json({ message: "Invalid OTP",success:false });
    } catch (error) {
      next(error);
    }
  };
};

