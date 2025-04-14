"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Configure Multer to store files in memory with simple error handling
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Only accept PDF files
        if (file.mimetype === "application/pdf") {
            cb(null, true); // Accept file
        }
        else {
            cb(null, false); // Reject file, simply return `false`
        }
    },
});
exports.upload = upload;
