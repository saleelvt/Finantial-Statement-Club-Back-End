"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const crypto_1 = require("crypto");
const generateOtp = () => {
    while (true) {
        const value = (0, crypto_1.randomInt)(100000, 999999);
        if (value.toString().length === 6) {
            return value;
        }
    }
};
exports.generateOtp = generateOtp;
