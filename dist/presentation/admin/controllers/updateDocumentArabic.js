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
exports.updateDocumentArabicController = void 0;
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const s3_1 = require("@/utilities/aws/s3");
const updateDocumentArabicController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        try {
            const { fullNameAr, nickNameAr, tadawalCode, sector } = req.body;
            const { id, language } = req.query;
            if (!id || !language) {
                return res.status(400).json({
                    success: false,
                    message: "ID and language are required to update the document",
                });
            }
            const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
            const fileUrls = {};
            let documentToUpdate = yield ArabicDocumentSchema_1.ArabicDocument.findById(id);
            if (!documentToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found",
                });
            }
            const hasAtLeastOneFile = Object.keys(req.files || {}).some(key => { var _a; return requiredFields.includes(key) && ((_a = req.files[key]) === null || _a === void 0 ? void 0 : _a.length) > 0; });
            if (!hasAtLeastOneFile) {
                return res.status(400).json({
                    success: false,
                    message: "At least one file must be uploaded.",
                });
            }
            // ✅ Get existing years from formData
            const existingYears = new Set();
            for (const fieldKey of requiredFields) {
                const year = (_b = (_a = documentToUpdate.formData) === null || _a === void 0 ? void 0 : _a[fieldKey]) === null || _b === void 0 ? void 0 : _b.year;
                if (year)
                    existingYears.add(year.trim());
            }
            // ✅ Get incoming years from uploaded files
            const incomingYears = new Set();
            for (const fieldKey of requiredFields) {
                if (((_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c[fieldKey]) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                    const year = (_e = req.body[`${fieldKey}Year`]) === null || _e === void 0 ? void 0 : _e.trim();
                    if (!year) {
                        return res.status(400).json({
                            success: false,
                            message: `Year is required for field '${fieldKey}'`,
                        });
                    }
                    incomingYears.add(year);
                }
            }
            // ✅ Rule 1: All uploaded files must have the same year
            if (incomingYears.size > 1) {
                return res.status(400).json({
                    success: false,
                    message: `All uploaded files must be for the same year. Got: ${Array.from(incomingYears).join(", ")}`,
                });
            }
            // ✅ Rule 2: If formData already contains a year, incoming year must match
            if (existingYears.size > 0) {
                const existingYear = Array.from(existingYears)[0];
                for (const y of incomingYears) {
                    if (y !== existingYear) {
                        return res.status(400).json({
                            success: false,
                            message: `Year mismatch: existing year is '${existingYear}', but got '${y}'`,
                        });
                    }
                }
            }
            // ✅ Update file fields
            for (const fieldKey of requiredFields) {
                const fileArray = ((_f = req.files) === null || _f === void 0 ? void 0 : _f[fieldKey]) || [];
                if (fileArray.length > 0) {
                    const file = fileArray[0];
                    const s3Url = yield (0, s3_1.uploadFileToS3)(file.buffer, file.originalname);
                    const date = req.body[`${fieldKey}Date`]
                        ? new Date(req.body[`${fieldKey}Date`])
                        : (_h = (_g = documentToUpdate.formData) === null || _g === void 0 ? void 0 : _g[fieldKey]) === null || _h === void 0 ? void 0 : _h.date;
                    const year = req.body[`${fieldKey}Year`] || ((_k = (_j = documentToUpdate.formData) === null || _j === void 0 ? void 0 : _j[fieldKey]) === null || _k === void 0 ? void 0 : _k.year) || "";
                    fileUrls[fieldKey] = { file: s3Url, date, year };
                }
                else {
                    const existingField = (_l = documentToUpdate.formData) === null || _l === void 0 ? void 0 : _l[fieldKey];
                    fileUrls[fieldKey] = {
                        file: (existingField === null || existingField === void 0 ? void 0 : existingField.file) || null,
                        date: (existingField === null || existingField === void 0 ? void 0 : existingField.date) || null,
                        year: (existingField === null || existingField === void 0 ? void 0 : existingField.year) || "",
                    };
                }
            }
            // ✅ Update document
            documentToUpdate.fullNameAr = fullNameAr || documentToUpdate.fullNameAr;
            documentToUpdate.nickNameAr = nickNameAr || documentToUpdate.nickNameAr;
            documentToUpdate.tadawalCode = tadawalCode || documentToUpdate.tadawalCode;
            documentToUpdate.sector = sector || documentToUpdate.sector;
            documentToUpdate.formData = Object.assign(Object.assign({}, documentToUpdate.formData), fileUrls);
            const updated = yield ArabicDocumentSchema_1.ArabicDocument.findOneAndUpdate({ _id: id }, documentToUpdate, {
                new: true,
                upsert: true,
                runValidators: true,
            });
            return res.status(200).json({
                success: true,
                message: "Document updated successfully",
                data: updated,
            });
        }
        catch (error) {
            console.error("Error updating document:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    });
};
exports.updateDocumentArabicController = updateDocumentArabicController;
