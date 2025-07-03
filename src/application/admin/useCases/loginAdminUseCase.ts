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

        // If admin not found, return null
        if (!admin) {
          return null;
        }

        // Use bcrypt.compare instead of plain text comparison
        const isPasswordValid = await comparePassword(password, admin.password);

        if (!isPasswordValid) {
          return null;
        }

        return admin;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
