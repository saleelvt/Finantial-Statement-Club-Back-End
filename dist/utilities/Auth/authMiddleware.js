"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("thiiiiiiiiiiiiiiiiiiiiiiieeeeeeeereirier: #$@$#@", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret");
        req.adminId = decoded.adminId; // Attach decoded data to the request object
        next(); // Pass control to the next middleware/route
    }
    catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
