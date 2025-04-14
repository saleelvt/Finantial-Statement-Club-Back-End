"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        res.locals.user = decoded; // Store the decoded user in locals
        next(); // Pass control to the next middleware or route handler
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.verifyAccessToken = verifyAccessToken;
