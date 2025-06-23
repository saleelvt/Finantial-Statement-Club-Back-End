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
exports.verifyOtpController = void 0;
const otpSchema_1 = require("@/infrastructure/database/models/otpSchema");
const generateAccessToken_1 = require("@/utilities/jwt/generateAccessToken");
const verifyOtpController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, email } = req.body;
            console.log('this sim y gjf req body of  the verify otp controller!!!!!!!! is', otp, email);
            const dbOtp = yield otpSchema_1.Otp.findOne({ email });
            if (dbOtp && otp === dbOtp.otp) {
                console.log("otp valide aanu ketto ");
                const { accessToken } = (0, generateAccessToken_1.generateTokens)(dbOtp._id.toString());
                console.log("the accessToken iws : ", accessToken);
                return res.status(200).json({
                    message: "OTP verified successfully",
                    success: true,
                    accessToken: accessToken
                });
            }
            console.log("otp invalid");
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.verifyOtpController = verifyOtpController;
