

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Otp } from "@/infrastructure/database/models/otpSchema";
import { Request, Response, NextFunction } from "express";
import { generateTokens } from "@/utilities/jwt/generateAccessToken";



export const verifyOtpController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { otp,email } = req.body;
      console.log('this sim y gjf req body of  the verify otp controller!!!!!!!! is' , otp,email) ;
      const dbOtp = await Otp.findOne({ email });
      
      if (dbOtp && otp === dbOtp.otp) {
        console.log("otp valide aanu ketto ");
        
        // const { accessToken, refreshToken } = generateTokens(dbOtp._id.toString());
        return res.status(200).json({
          message: "OTP verified successfully",
          success: true,
        
        });
      }
       console.log("otp invalid");
       return res.status(400).json({ message: "Invalid OTP",success:false });
      


    } catch (error) {
      next(error);
    }
  };
};

