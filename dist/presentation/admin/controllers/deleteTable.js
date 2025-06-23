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
exports.adminDeleteTableController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const adminDeleteTableController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Delete table endpoint triggered");
            const { TadawulCode } = req.params;
            const { language, quarterYear, selectedTableType, selectedYear } = req.query;
            console.log("Parameters received:", TadawulCode, language, quarterYear, selectedTableType, selectedYear);
            // Validate required parameters
            if (!TadawulCode || !language || !quarterYear || !selectedTableType || !selectedYear) {
                return res.status(400).json({
                    message: "Missing required parameters",
                    success: false
                });
            }
            // Convert query params to strings
            const yearStr = selectedYear;
            const quarterStr = quarterYear;
            const tableType = selectedTableType;
            // Find the appropriate document based on language
            let documentModel;
            if (language === "Arabic") {
                documentModel = ArabicDocumentSchema_1.ArabicDocument;
            }
            else {
                documentModel = documentSchema_1.Document;
            }
            // Step 1: Find document by TadawulCode
            const docs = yield documentModel.find({ tadawalCode: TadawulCode });
            if (!docs || docs.length === 0) {
                return res.status(404).json({
                    message: "No documents found with the provided Tadawul Code",
                    success: false
                });
            }
            // Step 2: Find the document with the matching year
            const getDocWithMatchingYear = (documents) => {
                for (const doc of documents) {
                    // Check formData properties in order of priority
                    const priorityOrder = ['Board', 'Year', 'S1', 'Q4', 'Q3', 'Q2', 'Q1'];
                    for (const period of priorityOrder) {
                        if (doc.formData[period] && doc.formData[period].year === yearStr) {
                            return doc;
                        }
                    }
                }
                return null;
            };
            const targetDoc = getDocWithMatchingYear(docs);
            if (!targetDoc) {
                return res.status(404).json({
                    message: `No document found for year ${yearStr}`,
                    success: false
                });
            }
            // Step 3: Delete the specified table from the selected quarter/year
            if (!targetDoc.formData[quarterStr]) {
                return res.status(404).json({
                    message: `Quarter/period ${quarterStr} not found in the document`,
                    success: false
                });
            }
            if (!targetDoc.formData[quarterStr].table[tableType]) {
                return res.status(404).json({
                    message: `Table ${tableType} not found in ${quarterStr}`,
                    success: false
                });
            }
            // Delete the selected table by setting it to null or empty string
            targetDoc.formData[quarterStr].table[tableType] = "";
            // Save the updated document
            yield targetDoc.save();
            return res.status(200).json({
                message: `Successfully deleted ${tableType} table from ${quarterStr} for year ${yearStr}`,
                success: true,
                data: targetDoc
            });
        }
        catch (error) {
            console.error("Error in adminDeleteTableController:", error);
            next(error);
        }
    });
};
exports.adminDeleteTableController = adminDeleteTableController;
