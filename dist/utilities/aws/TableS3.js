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
exports.uploadTableFileToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const mime_types_1 = __importDefault(require("mime-types"));
const uuid_1 = require("uuid"); // Import UUID for unique names
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const uploadTableFileToS3 = (fileBuffer, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileExtension = fileName.split(".").pop(); // Extract file extension
        const contentType = mime_types_1.default.lookup(fileExtension || "") || "application/octet-stream"; // Detect MIME type
        // Generate a unique filename
        const uniqueFileName = `table_screenshot_${Date.now()}_${(0, uuid_1.v4)()}.${fileExtension}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `uploads/${uniqueFileName}`, // Save in "uploads" folder with a unique name
            Body: fileBuffer,
            ContentType: contentType,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3Client.send(command);
        const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        console.log("✅ File uploaded successfully:", fileUrl);
        return fileUrl;
    }
    catch (error) {
        console.error("❌ Error uploading file to S3:", error);
        throw new Error("File upload failed");
    }
});
exports.uploadTableFileToS3 = uploadTableFileToS3;
