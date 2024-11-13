import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';

export const adminRoutes = (dependencies: IAdminDependencies) => {

    
    const { loginAdmin,logoutAdmin,addDocument } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin); // No need to change this line.
    router.route('/logout').delete(logoutAdmin);
    router.route('/addDocument').post(addDocument)

    return router;
};
