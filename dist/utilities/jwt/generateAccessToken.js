"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateTokens = (adminId) => {
    const accessToken = jsonwebtoken_1.default.sign({ adminId }, process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret", // Access token secret
    { expiresIn: "24h" } // Set expiration for the access token (24 hours)
    );
    const refreshToken = jsonwebtoken_1.default.sign({ adminId }, process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret", // Refresh token secret
    { expiresIn: "7d" } // Set expiration for the refresh token
    );
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
