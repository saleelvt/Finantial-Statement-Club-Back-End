import { adminGetAdminAllDocumentController } from './getAllDocumentsAdmin';
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminLogutController } from "./adminLogout";
import { adminAddDocumentController } from "./addDocument";
import { adminDeleteDocumentController } from "./deleteDocument";
import { adminGetAllDocumentController } from "./getAllDocuments"; 
import { adminAddDocumentArabicController } from "./addDocumentArabic";
import { adminGetAllArabicDocumentController } from "./getAllArabicDocuments";
import { adminGetDocumetnByNickNameController } from "./getDocumetnByNickName";
import { adminGetNicknamesSuggestionsController } from "./nickNameSuggestion";
import { adminGetDataWithSuggestionsController } from "./getDataWithSuggestions";
import { adminGetDocumentByIdController } from "./getDocumentById";
import { updateDocumentEnglishController } from "./updateDocumentEnglish";
import { updateDocumentArabicController } from "./updateDocumentArabic";
import { adminAddTableController } from "./adminAddTable";
import { adminGetDataWithSuggestionsForTable } from "./GetDataWithSuggestionsForTable";
import { verifyOtpController } from "./verifyOtp";
import { adminGetDataWithYearQuartertadawalCodeForTableViewController } from "./getDataWithYearQuartertadawalCodeForTableView";

import { adminDeleteTableController } from "./deleteTable";
export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies),
        verifyOtp:verifyOtpController(dependencies),
        logoutAdmin:adminLogutController(dependencies),
        addDocument:adminAddDocumentController(dependencies),
        deleteDocument:adminDeleteDocumentController(dependencies),
        deleteTable:adminDeleteTableController(dependencies),
        getAllDocuments:adminGetAllDocumentController(dependencies),
        getAllAdminDocuments:adminGetAdminAllDocumentController(dependencies),
        getAllArabicDocuments:adminGetAllArabicDocumentController(dependencies),
        addTable:adminAddTableController(dependencies),
        addDocumentArabic:adminAddDocumentArabicController(dependencies),
        getDocumetnByNickName:adminGetDocumetnByNickNameController(dependencies),
        getNicknamesSuggestions:adminGetNicknamesSuggestionsController(dependencies),
        getDataWithSuggestions:adminGetDataWithSuggestionsController(dependencies),
        getDocumentById:adminGetDocumentByIdController(dependencies),
        updateDocumentEnglish:updateDocumentEnglishController(dependencies),
        updateDocumentArabic:updateDocumentArabicController(dependencies),
        getDataWithSuggestionsForTable:adminGetDataWithSuggestionsForTable(dependencies),
        getDataWithYearQuartertadawalCodeForTableView:adminGetDataWithYearQuartertadawalCodeForTableViewController(dependencies)
        
        
    };
};
