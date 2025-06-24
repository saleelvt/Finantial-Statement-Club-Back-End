"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const getAllDocumentsAdmin_1 = require("./getAllDocumentsAdmin");
const adminLogin_1 = require("./adminLogin");
const adminLogout_1 = require("./adminLogout");
const addDocument_1 = require("./addDocument");
const deleteDocument_1 = require("./deleteDocument");
const getAllDocuments_1 = require("./getAllDocuments");
const addDocumentArabic_1 = require("./addDocumentArabic");
const getAllArabicDocuments_1 = require("./getAllArabicDocuments");
const getDocumetnByNickName_1 = require("./getDocumetnByNickName");
const nickNameSuggestion_1 = require("./nickNameSuggestion");
const getDataWithSuggestions_1 = require("./getDataWithSuggestions");
const getDocumentById_1 = require("./getDocumentById");
const updateDocumentEnglish_1 = require("./updateDocumentEnglish");
const updateDocumentArabic_1 = require("./updateDocumentArabic");
const adminAddTable_1 = require("./adminAddTable");
const GetDataWithSuggestionsForTable_1 = require("./GetDataWithSuggestionsForTable");
const verifyOtp_1 = require("./verifyOtp");
const getDataWithYearQuartertadawalCodeForTableView_1 = require("./getDataWithYearQuartertadawalCodeForTableView");
const deleteTable_1 = require("./deleteTable");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies),
        verifyOtp: (0, verifyOtp_1.verifyOtpController)(dependencies),
        logoutAdmin: (0, adminLogout_1.adminLogutController)(dependencies),
        addDocument: (0, addDocument_1.adminAddDocumentController)(dependencies),
        deleteDocument: (0, deleteDocument_1.adminDeleteDocumentController)(dependencies),
        deleteTable: (0, deleteTable_1.adminDeleteTableController)(dependencies),
        getAllDocuments: (0, getAllDocuments_1.adminGetAllDocumentController)(dependencies),
        getAllAdminDocuments: (0, getAllDocumentsAdmin_1.adminGetAdminAllDocumentController)(dependencies),
        getAllArabicDocuments: (0, getAllArabicDocuments_1.adminGetAllArabicDocumentController)(dependencies),
        addTable: (0, adminAddTable_1.adminAddTableController)(dependencies),
        addDocumentArabic: (0, addDocumentArabic_1.adminAddDocumentArabicController)(dependencies),
        getDocumetnByNickName: (0, getDocumetnByNickName_1.adminGetDocumetnByNickNameController)(dependencies),
        getNicknamesSuggestions: (0, nickNameSuggestion_1.adminGetNicknamesSuggestionsController)(dependencies),
        getDataWithSuggestions: (0, getDataWithSuggestions_1.adminGetDataWithSuggestionsController)(dependencies),
        getDocumentById: (0, getDocumentById_1.adminGetDocumentByIdController)(dependencies),
        updateDocumentEnglish: (0, updateDocumentEnglish_1.updateDocumentEnglishController)(dependencies),
        updateDocumentArabic: (0, updateDocumentArabic_1.updateDocumentArabicController)(dependencies),
        getDataWithSuggestionsForTable: (0, GetDataWithSuggestionsForTable_1.adminGetDataWithSuggestionsForTable)(dependencies),
        getDataWithYearQuartertadawalCodeForTableView: (0, getDataWithYearQuartertadawalCodeForTableView_1.adminGetDataWithYearQuartertadawalCodeForTableViewController)(dependencies)
    };
};
exports.adminController = adminController;
