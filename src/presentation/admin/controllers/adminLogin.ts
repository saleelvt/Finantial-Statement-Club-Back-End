import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "@/utilities/jwt/generateAccessToken";

export const loginAdminController = (dependencies: IAdminDependencies) => {
    const { useCases: { loginAdminUseCase } } = dependencies;
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void |null | any> => {
        console.log("saleel sis ");
        try {
            const { email, password } = req.body;
            console.log("Admin login attempt:", email, password);

            // Check if both email and password are provided
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required" });
            }
            // Call the login use case and await the result
            const data = await loginAdminUseCase(dependencies).execute(email, password);
            console.log("prrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",data);
            

            if (!data) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const adminId = data._id?.toString();
            const adminEmail = data.email;
            const adminRole = data.role;

            if (!adminId || !adminEmail || !adminRole) {
                return res
                  .status(500)
                  .json({ message: "Admin information is incomplete" });
              }


              const accessToken = generateAccessToken({
                _id: adminId,
                email: adminEmail,
                role: adminRole,
              });

                  // Set cookies with tokens
      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });
          
      return res.status(200).json({
        message: "Login successful",
        data: data,
      });

        } catch (error) {
            console.error("Failed to log in admin:", error);
            // Pass error to the next error handler
            next(error); 
        }
    };
};