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
exports.loginAdminController = void 0;
const otpSchema_1 = require("@/infrastructure/database/models/otpSchema");
const generateOtp_1 = require("@/utilities/OTP/generateOtp");
const sentOtp_1 = require("@/utilities/OTP/sentOtp");
const loginAdminController = (dependencies) => {
    const { useCases: { loginAdminUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ success: false, message: "Email and password are required" });
            }
            const data = yield loginAdminUseCase(dependencies).execute(email, password);
            if (!data) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid credentials" });
            }
            const otp = (0, generateOtp_1.generateOtp)();
            console.log("this is my otp for the client login ");
            const emailExist = yield otpSchema_1.Otp.findOne({ email: email });
            let dbOtp;
            if (emailExist) {
                console.log("otp unde");
                dbOtp = yield otpSchema_1.Otp.findByIdAndUpdate({ email: email, otp }, { $set: { otp, createdAt: new Date() } });
            }
            else {
                dbOtp = yield otpSchema_1.Otp.create({ email: email, otp });
            }
            if (dbOtp) {
                yield (0, sentOtp_1.sendOtp)(email, otp);
            }
            const adminId = (_a = data._id) === null || _a === void 0 ? void 0 : _a.toString();
            const adminEmail = data.email;
            const adminRole = data.role;
            if (!adminId || !adminEmail || !adminRole) {
                return res
                    .status(500)
                    .json({ message: "Admin information is incomplete" });
            }
            return res.status(200).json({
                success: true,
                message: "An OTP has been sent to your email ",
                data: data,
            });
        }
        catch (error) {
            console.error(error, "<< Something went wrong in user Login >>");
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    });
};
exports.loginAdminController = loginAdminController;
