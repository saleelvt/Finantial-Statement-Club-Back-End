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
                console.log("dfkdsjfk66666666666666 use case ");
                const admin = yield adminFindByEmail(email);
                if (!admin) {
                    throw new Error("admin not found ");
                }
                const isPasswordValid = password === admin.password;
                // const isPasswordValid= await comparePassword(password,admin.password)
                console.log("isPasswordffffffffffffffffffffffffffffffffffffffffffffffffffValid", isPasswordValid);
                if (!isPasswordValid) {
                    throw new Error("Invalid  slaeel credentials");
                }
                return admin;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    };
};
exports.loginAdminUseCase = loginAdminUseCase;
