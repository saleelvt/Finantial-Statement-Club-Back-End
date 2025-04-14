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
exports.adminAddDocumentController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const s3_1 = require("@/utilities/aws/s3");
const adminAddDocumentController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
            console.log("Request files: ", req.files, "Fields: ", fullNameEn, nickNameEn);
            const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
            const fileUrls = {};
            // Check if documents with the same Tadawal code already exist
            const existDocuments = yield documentSchema_1.Document.find({ tadawalCode: tadawalCode });
            if (existDocuments.length > 0) {
                console.log("Existing documents with Tadawal code: ", existDocuments);
                // Check each document's formData.Q1.year against the current Q1Year
                const q1YearFromRequest = req.body["Q1Year"] || "";
                for (const doc of existDocuments) {
                    if (((_b = (_a = doc.formData) === null || _a === void 0 ? void 0 : _a.Q1) === null || _b === void 0 ? void 0 : _b.year) === q1YearFromRequest) {
                        return res.status(400).json({
                            success: false,
                            message: `File with Q1 year ${q1YearFromRequest} already exists in one of the documents.`,
                        });
                    }
                }
            }
            // Process each required field
            for (const fieldKey of requiredFields) {
                const fileArray = req.files[fieldKey];
                if (fileArray && fileArray.length > 0) {
                    const file = fileArray[0];
                    const s3Url = yield (0, s3_1.uploadFileToS3)(file.buffer, file.originalname);
                    const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
                    const year = req.body[`${fieldKey}Year`] || "";
                    fileUrls[fieldKey] = {
                        file: s3Url,
                        date,
                        year,
                    };
                }
                else {
                    fileUrls[fieldKey] = {
                        file: null,
                        date: null,
                        year: "",
                    };
                }
            }
            // Create the new document object
            const newDocument = new documentSchema_1.Document({
                fullNameEn: fullNameEn || "",
                nickNameEn: nickNameEn || "",
                tadawalCode: tadawalCode || "",
                sector: sector || "",
                formData: fileUrls,
            });
            // Save the new document
            yield newDocument.save();
            console.log("Document successfully saved: ", newDocument);
            res.status(200).json({
                success: true,
                message: "Document created successfully",
                data: newDocument,
            });
        }
        catch (error) {
            console.error("Error creating document:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};
exports.adminAddDocumentController = adminAddDocumentController;
