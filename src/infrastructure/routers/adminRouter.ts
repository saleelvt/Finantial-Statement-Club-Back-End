import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';

export const adminRoutes = (dependencies: IAdminDependencies) => {
    console.log("the data got in back end ");
    
    const { loginAdmin } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin); // No need to change this line.
    return router;
};
