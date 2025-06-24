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
/**
 * Finds an admin by email.
 * @param email - Email address to search for.
 * @returns AdminEntity if found, otherwise null.
 */
const adminFindByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || typeof email !== "string") {
            throw new Error("Invalid email provided.");
        }
        console.log("🔍 Searching admin with email:", email);
        const existingAdmin = yield adminSchema_1.Admin.findOne({ email });
        if (!existingAdmin) {
            console.warn("⚠️ No admin found for email:", email);
            return null;
        }
        return existingAdmin;
    }
    catch (error) {
        console.error("❌ Error in adminFindByEmail:", error === null || error === void 0 ? void 0 : error.message);
        throw new Error(`adminFindByEmail failed: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
});
exports.adminFindByEmail = adminFindByEmail;
