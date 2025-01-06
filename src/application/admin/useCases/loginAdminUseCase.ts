import { IAdminDependencies } from "../interfaces/IAdminDependencies";
import { comparePassword } from "@/utilities/encrypt/comparePassword";
export const loginAdminUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { adminFindByEmail },
  } = dependencies;
  return {
    execute: async (email: string, password: string) => {
      try {
        console.log("dfkdsjfk66666666666666 use case ");
        
        const admin = await adminFindByEmail(email);
        if (!admin) {
          throw new Error("admin not found ");
        }
        const isPasswordValid = password === admin.password;
        // const isPasswordValid= await comparePassword(password,admin.password)
        console.log("isPasswordffffffffffffffffffffffffffffffffffffffffffffffffffValid",isPasswordValid)
        if (!isPasswordValid) {
          throw new Error("Invalid  slaeel credentials");
        }
        return admin;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
