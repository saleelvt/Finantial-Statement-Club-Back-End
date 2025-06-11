import { IAdminDependencies } from "../interfaces/IAdminDependencies";
import { comparePassword } from "@/utilities/encrypt/comparePassword";

export const loginAdminUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { adminFindByEmail },
  } = dependencies;
  
  return {
    execute: async (email: string, password: string) => {
      try {
        const admin = await adminFindByEmail(email);
        
        // If admin not found, return null (don't throw error)
        if (!admin) {
          return null;
        }
        
        const isPasswordValid = password === admin.password;
        // const isPasswordValid = await comparePassword(password, admin.password);
        
        // If password is invalid, return null (don't throw error)
        if (!isPasswordValid) {
          return null;
        }
        
        // Return admin data if everything is valid
        return admin;
      } catch (error: any) {
        // Only throw for actual system errors (database connection issues, etc.)
        throw new Error(error.message);
      }
    },
  };
};