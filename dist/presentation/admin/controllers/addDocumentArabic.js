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
exports.adminAddDocumentArabicController = void 0;
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const s3_1 = require("@/utilities/aws/s3");
const adminAddDocumentArabicController = (dependencies) => {
    console.log('dasdfdf saleel is a good boy ');
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        console.log('___________', req.body);
        try {
            const { fullNameAr, nickNameAr, tadawalCode, sector } = req.body;
            console.log("this is my req.files ", req.files, fullNameAr, nickNameAr);
            const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
            const fileUrls = {};
            // Check if documents with the same Tadawal code already exist
            const existDocuments = yield ArabicDocumentSchema_1.ArabicDocument.find({ tadawalCode: tadawalCode });
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
                    // If file is missing, set it as null
                    fileUrls[fieldKey] = {
                        file: null,
                        date: null,
                        year: "",
                    };
                }
            }
            const newDocument = new ArabicDocumentSchema_1.ArabicDocument({
                fullNameAr: fullNameAr || "",
                nickNameAr: nickNameAr || "",
                tadawalCode: tadawalCode || "",
                sector: sector || "",
                formData: fileUrls,
            });
            yield newDocument.save();
            console.log("document arabic saved macha araaaaaaaaaaaaaaabbbbbbbbbbeeee ", newDocument);
            yield newDocument.save();
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
exports.adminAddDocumentArabicController = adminAddDocumentArabicController;
