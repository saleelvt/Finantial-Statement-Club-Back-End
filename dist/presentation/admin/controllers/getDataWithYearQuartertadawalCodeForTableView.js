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
exports.adminGetDataWithYearQuartertadawalCodeForTableViewController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const adminGetDataWithYearQuartertadawalCodeForTableViewController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { year, quarterYear, tadawulCode } = req.query;
            if (!year || !quarterYear || !tadawulCode) {
                return res.status(400).json({ message: "Required fields are missing" });
            }
            const quarter = String(quarterYear);
            const tadawul = String(tadawulCode);
            const yearStr = String(year);
            // Step 1: Find all matching documents for both English and Arabic
            const englishDocs = yield documentSchema_1.Document.find({ tadawalCode: tadawul });
            const arabicDocs = yield ArabicDocumentSchema_1.ArabicDocument.find({ tadawalCode: tadawul });
            // Helper to extract matched table based on quarter and year
            const findMatchingTable = (docs) => {
                for (const doc of docs) {
                    const formData = doc.formData;
                    const quarterData = formData === null || formData === void 0 ? void 0 : formData[quarter];
                    if (quarterData &&
                        quarterData.file &&
                        quarterData.year &&
                        quarterData.year === yearStr) {
                        return quarterData.table;
                    }
                }
                return null;
            };
            const englishTable = findMatchingTable(englishDocs);
            const arabicTable = findMatchingTable(arabicDocs);
            // Return response
            return res.status(200).json({
                message: "Documents fetched successfully",
                success: true,
                englishTable, arabicTable
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.adminGetDataWithYearQuartertadawalCodeForTableViewController = adminGetDataWithYearQuartertadawalCodeForTableViewController;
