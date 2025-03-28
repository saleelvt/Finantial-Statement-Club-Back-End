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
exports.adminFindByEmail = void 0;
const adminSchema_1 = require("../../models/adminSchema");
const adminFindByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🚀 ~ AdminEmail to find:", email);
        const existingAdmin = yield adminSchema_1.Admin.findOne({ email: email });
        console.log("_________________sasasa___________", existingAdmin);
        return existingAdmin;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.adminFindByEmail = adminFindByEmail;
