import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';
import { authMiddleware } from '@/utilities/Auth/authMiddleware';
import upload from '@/utilities/multer/multer';

export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin,verifyOtp, logoutAdmin, addDocument, deleteDocument, getAllDocuments,addDocumentArabic,addTable,getAllArabicDocuments,getDocumetnByNickName,getNicknamesSuggestions,getDataWithSuggestions,getDocumentById,updateDocumentEnglish,updateDocumentArabic,getDataWithSuggestionsForTable } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin);
    router.route("/verifyOtp").post(verifyOtp);
    router.route("/logout").delete(authMiddleware,logoutAdmin);
    router.route("/addDocumentEnglish").post(authMiddleware,upload.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]),addDocument);
    router.route("/addDocumentArabic").post(authMiddleware,upload.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]),addDocumentArabic);
    router.route("/addTable").post(authMiddleware,upload.fields([{name:"screenshotFile"}]),addTable);
    router.route("/deleteDocument/:docToDelete").delete(authMiddleware,deleteDocument);
    router.route("/getDocuments").get(getAllDocuments);
    router.route("/getArabicDocuments").get(getAllArabicDocuments);
    router.route("/getDocumetnBytadawalCode").get(getDocumetnByNickName);
    router.route('/tadawalCodeSuggestions').get(getNicknamesSuggestions)
    router.route('/getDataWithSuggestions').get(getDataWithSuggestions)
    router.route('/getDataWithSuggestionsForTable').get(getDataWithSuggestionsForTable)
    router.route('/getDocumentById/:id').get(authMiddleware,getDocumentById)
    router.route('/updateDocumentEnglish').put(authMiddleware,upload.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]),updateDocumentEnglish)
    router.route('/updateDocumentArabic').put(authMiddleware,upload.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]),updateDocumentArabic)
    return router;
};
