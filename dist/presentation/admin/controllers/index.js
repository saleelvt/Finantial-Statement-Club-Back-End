"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
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
const verifyOtp_1 = require("./verifyOtp");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies),
        verifyOtp: (0, verifyOtp_1.verifyOtpController)(dependencies),
        logoutAdmin: (0, adminLogout_1.adminLogutController)(dependencies),
        addDocument: (0, addDocument_1.adminAddDocumentController)(dependencies),
        deleteDocument: (0, deleteDocument_1.adminDeleteDocumentController)(dependencies),
        getAllDocuments: (0, getAllDocuments_1.adminGetAllDocumentController)(dependencies),
        addDocumentArabic: (0, addDocumentArabic_1.adminAddDocumentArabicController)(dependencies),
        getAllArabicDocuments: (0, getAllArabicDocuments_1.adminGetAllArabicDocumentController)(dependencies),
        getDocumetnByNickName: (0, getDocumetnByNickName_1.adminGetDocumetnByNickNameController)(dependencies),
        getNicknamesSuggestions: (0, nickNameSuggestion_1.adminGetNicknamesSuggestionsController)(dependencies),
        getDataWithSuggestions: (0, getDataWithSuggestions_1.adminGetDataWithSuggestionsController)(dependencies),
        getDocumentById: (0, getDocumentById_1.adminGetDocumentByIdController)(dependencies),
        updateDocumentEnglish: (0, updateDocumentEnglish_1.updateDocumentEnglishController)(dependencies),
        updateDocumentArabic: (0, updateDocumentArabic_1.updateDocumentArabicController)(dependencies)
    };
};
exports.adminController = adminController;
