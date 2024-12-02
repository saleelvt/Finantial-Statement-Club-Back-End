import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';
import { verifyAccessToken } from '@/utilities/Auth/authMiddleware';
import upload from '@/utilities/multer/multer';

export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin, logoutAdmin, addDocument, deleteDocument, getAllDocuments } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin);
    router.route("/logout").delete(logoutAdmin);
    router.route("/addDocumentEnglish").post(upload.fields([{ name: "Board" }, { name: "Q1" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4" }, { name: "S1" }, { name: "Year" }]),addDocument);
    router.route("/deleteDocument/:docToDelete").delete(deleteDocument);
    router.route("/getDocuments").get(getAllDocuments);
    return router;
};
