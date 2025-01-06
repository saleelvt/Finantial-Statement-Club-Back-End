import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

import { Otp } from "@/infrastructure/database/models/otpSchema";
import { generateOtp } from "@/utilities/OTP/generateOtp";
import { sendOtp } from "@/utilities/OTP/sentOtp";

export const loginAdminController = (dependencies: IAdminDependencies) => {
  const {
    useCases: { loginAdminUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | null | any> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email and password are required" });
      }

      const data = await loginAdminUseCase(dependencies).execute(
        email,
        password
      );

      if (!data) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const otp = generateOtp();
      console.log("this is my otp for the client login ");
      const emailExist = await Otp.findOne({ email: email });

      let dbOtp;
      if (emailExist) {
        console.log("otp unde");
        dbOtp = await Otp.findByIdAndUpdate(
          { email: email, otp },
          { $set: { otp, createdAt: new Date() } }
        );
      } else {
        dbOtp = await Otp.create({ email: email, otp });
      }
      if (dbOtp) {
        await sendOtp(email, otp);
      }

      const adminId = data._id?.toString();
      const adminEmail = data.email;
      const adminRole = data.role;

      if (!adminId || !adminEmail || !adminRole) {
        return res
          .status(500)
          .json({ message: "Admin information is incomplete" });
      }


      return res.status(200).json({
        success: true,
        message: "An OTP has been sent to your email ",
        data: data,
      });
    } catch (error) {
      console.error(error, "<< Something went wrong in user Login >>");
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
