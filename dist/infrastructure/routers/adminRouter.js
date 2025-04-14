"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const multer_1 = __importDefault(require("@/utilities/multer/multer"));
const adminRoutes = (dependencies) => {
    const { loginAdmin, verifyOtp, logoutAdmin, addDocument, deleteDocument, getAllDocuments, addDocumentArabic, getAllArabicDocuments, getDocumetnByNickName, getNicknamesSuggestions, getDataWithSuggestions, getDocumentById, updateDocumentEnglish, updateDocumentArabic } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin);
    router.route("/verifyOtp").post(verifyOtp);
    router.route("/logout").delete(logoutAdmin);
    router.route("/addDocumentEnglish").post(multer_1.default.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]), addDocument);
    router.route("/addDocumentArabic").post(multer_1.default.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]), addDocumentArabic);
    router.route("/deleteDocument/:docToDelete").delete(deleteDocument);
    router.route("/getDocuments").get(getAllDocuments);
    router.route("/getArabicDocuments").get(getAllArabicDocuments);
    router.route("/getDocumetnBytadawalCode").get(getDocumetnByNickName);
    router.route('/tadawalCodeSuggestions').get(getNicknamesSuggestions);
    router.route('/getDataWithSuggestions').get(getDataWithSuggestions);
    router.route('/getDocumentById/:id').get(getDocumentById);
    router.route('/updateDocumentEnglish').put(multer_1.default.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]), updateDocumentEnglish);
    router.route('/updateDocumentArabic').put(multer_1.default.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]), updateDocumentArabic);
    return router;
};
exports.adminRoutes = adminRoutes;
