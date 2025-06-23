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
exports.adminGetDataWithSuggestionsForTable = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const adminGetDataWithSuggestionsForTable = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, language } = req.query;
            if (!name || typeof name !== "string") {
                return res.status(400).json({ message: "Name is required and must be a string." });
            }
            console.log("my name ", name);
            // Suggestions variable
            let suggestions = [];
            if (language === "Arabic") {
                suggestions = yield ArabicDocumentSchema_1.ArabicDocument.find({ tadawalCode: name });
            }
            else if (language === "English") {
                suggestions = yield documentSchema_1.Document.find({ tadawalCode: name });
            }
            else {
                return res.status(400).json({ message: "Invalid admin language provided." });
            }
            // Return suggestions
            return res.status(200).json({ message: "suggestions Documents Fetched Success", success: true, data: suggestions });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.adminGetDataWithSuggestionsForTable = adminGetDataWithSuggestionsForTable;
