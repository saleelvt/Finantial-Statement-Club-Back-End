import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';
import { upload } from '@/utilities/fileUpload';
import { verifyAccessToken } from '@/utilities/Auth/authMiddleware';

export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin, logoutAdmin, addDocument, deleteDocument, getAllDocuments } = adminController(dependencies);
    const router = Router();


    router.route("/login").post(loginAdmin);
    router.route("/logout").delete(logoutAdmin);
    // Apply Multer middleware to handle file uploads
    router.route("/addDocument").post(verifyAccessToken, upload.fields([{ name: "fileAr" }, { name: "fileEn" }]), addDocument);
    router.route("/deleteDocument/:docToDelete").delete(verifyAccessToken,deleteDocument);
    router.route("/getDocuments").get(verifyAccessToken,getAllDocuments);
    return router;
};
