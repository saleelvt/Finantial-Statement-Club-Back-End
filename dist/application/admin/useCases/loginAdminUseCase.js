"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminUseCase = void 0;
const loginAdminUseCase = (dependencies) => {
    const { repositories: { adminFindByEmail }, } = dependencies;
    return {
        execute: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const admin = yield adminFindByEmail(email);
                // If admin not found, return null (don't throw error)
                if (!admin) {
                    return null;
                }
                const isPasswordValid = password === admin.password;
                // const isPasswordValid = await comparePassword(password, admin.password);
                // If password is invalid, return null (don't throw error)
                if (!isPasswordValid) {
                    return null;
                }
                // Return admin data if everything is valid
                return admin;
            }
            catch (error) {
                // Only throw for actual system errors (database connection issues, etc.)
                throw new Error(error.message);
            }
        }),
    };
};
exports.loginAdminUseCase = loginAdminUseCase;
