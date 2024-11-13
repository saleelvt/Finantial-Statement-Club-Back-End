import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminLogutController } from "./adminLogout";
import { adminAddDocumentController } from "./addDocument";

export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies), // No change needed here.
        logoutAdmin:adminLogutController(dependencies),
        addDocument:adminAddDocumentController(dependencies)
    };
};
