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
exports.adminGetDocumentByIdController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const formKeys = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
const adminGetDocumentByIdController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { language } = req.query;
            const id = req.params.id;
            if (!id || !language) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required query parameters: id or language",
                });
            }
            let mainDoc = null;
            let oppositeDoc = null;
            if (language === "Arabic") {
                mainDoc = yield ArabicDocumentSchema_1.ArabicDocument.findById(id);
                if (!mainDoc) {
                    return res.status(404).json({
                        success: false,
                        message: "Arabic document not found",
                    });
                }
                // extract a valid year from Arabic document
                const arabicYear = getFirstValidYear(mainDoc.formData);
                if (arabicYear && mainDoc.tadawalCode) {
                    oppositeDoc = yield documentSchema_1.Document.findOne({
                        tadawalCode: mainDoc.tadawalCode,
                    });
                    if (oppositeDoc &&
                        hasMatchingYear(oppositeDoc.formData, arabicYear)) {
                        // match found, return both
                        return res.status(200).json({
                            success: true,
                            data: {
                                data: mainDoc,
                                matchedOppositeLanguageDoc: oppositeDoc,
                            },
                        });
                    }
                }
                return res.status(200).json({
                    success: true,
                    data: {
                        data: mainDoc,
                    },
                });
            }
            else if (language === "English") {
                console.log("english section ocupid: ", language);
                mainDoc = yield documentSchema_1.Document.findById(id);
                if (!mainDoc) {
                    return res.status(404).json({
                        success: false,
                        message: "English document not found",
                    });
                }
                console.log("my main doc: ", mainDoc);
                // extract a valid year from English document
                const englishYear = getFirstValidYear(mainDoc.formData);
                if (englishYear && mainDoc.tadawalCode) {
                    oppositeDoc = yield ArabicDocumentSchema_1.ArabicDocument.findOne({
                        tadawalCode: mainDoc.tadawalCode,
                    });
                    if (oppositeDoc &&
                        hasMatchingYear(oppositeDoc.formData, englishYear)) {
                        // match found, return both
                        return res.status(200).json({
                            success: true,
                            data: {
                                data: mainDoc,
                                matchedOppositeLanguageDoc: oppositeDoc,
                            },
                        });
                    }
                }
                return res.status(200).json({
                    success: true,
                    data: {
                        data: mainDoc,
                    },
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid language provided",
                });
            }
        }
        catch (error) {
            console.error("Error fetching documents:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    });
};
exports.adminGetDocumentByIdController = adminGetDocumentByIdController;
// Extract first valid year from formData fields
function getFirstValidYear(formData) {
    var _a;
    for (const key of formKeys) {
        if ((_a = formData === null || formData === void 0 ? void 0 : formData[key]) === null || _a === void 0 ? void 0 : _a.year) {
            return formData[key].year.trim();
        }
    }
    return null;
}
// Check if any field in formData matches the given year
function hasMatchingYear(formData, targetYear) {
    var _a, _b;
    for (const key of formKeys) {
        if (((_b = (_a = formData === null || formData === void 0 ? void 0 : formData[key]) === null || _a === void 0 ? void 0 : _a.year) === null || _b === void 0 ? void 0 : _b.trim()) === targetYear) {
            return true;
        }
    }
    return false;
}
