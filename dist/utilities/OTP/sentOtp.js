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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailCongig_1 = require("@/boot/emailCongig");
const sendOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('email is this ', emailCongig_1.EMAIL);
    console.log("email is this ", emailCongig_1.PASSWORD);
    const transporter = nodemailer_1.default.createTransport({
        port: 465,
        service: 'Gmail',
        auth: {
            user: emailCongig_1.EMAIL,
            pass: emailCongig_1.PASSWORD,
        },
        secure: true,
    });
    const message = "Enter This OTP to Continue";
    const mailData = {
        from: "techno12.ab@outlook.com",
        to: email,
        subject: "OTP From  Finstatements.club ADMIN LOGIN",
        html: `<p>${message}</p> <p style="color: gray; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p><p>This Code <b>expires in ${1} minutes(s)</b>.</p>`,
    };
    const result = transporter.sendMail(mailData, (error, info) => {
        return new Promise((resolve, reject) => {
            if (error) {
                console.log("Error ippo  occurred while sending the", error);
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
});
exports.sendOtp = sendOtp;
