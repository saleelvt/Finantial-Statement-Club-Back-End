import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminLogutController } from "./adminLogout";
import { adminAddDocumentController } from "./addDocument";
import { adminDeleteDocumentController } from "./deleteDocument";
import { adminGetAllDocumentController } from "./getAllDocuments"; 
import { adminAddDocumentArabicController } from "./addDocumentArabic";
import { adminGetAllArabicDocumentController } from "./getAllArabicDocuments";
import { adminGetDocumetnByNickNameController } from "./getDocumetnByNickName";
export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies),
        logoutAdmin:adminLogutController(dependencies),
        addDocument:adminAddDocumentController(dependencies),
        deleteDocument:adminDeleteDocumentController(dependencies),
        getAllDocuments:adminGetAllDocumentController(dependencies),
        addDocumentArabic:adminAddDocumentArabicController(dependencies),
        getAllArabicDocuments:adminGetAllArabicDocumentController(dependencies),
        getDocumetnByNickName:adminGetDocumetnByNickNameController(dependencies)
    };
};
