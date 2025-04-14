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
exports.adminGetDocumetnByNickNameController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const adminGetDocumetnByNickNameController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tadawalCode, language } = req.query;
            console.log("backend - ", tadawalCode, language);
            if (!tadawalCode || !language) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required query parameters: brandNickName or userLanguage",
                });
            }
            console.log("my params nick name ", tadawalCode, language);
            let response;
            if (language === "Arabic") {
                response = yield ArabicDocumentSchema_1.ArabicDocument.find({ tadawalCode: tadawalCode });
                if (!response) {
                    return res.status(404).json({
                        success: false,
                        message: "Document not found for the given Arabic nickname",
                    });
                }
            }
            else if (language === "English") {
                response = yield documentSchema_1.Document.find({ tadawalCode: tadawalCode });
                if (!response) {
                    return res.status(404).json({
                        success: false,
                        message: "Document not found for the given English nickname",
                    });
                }
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user language provided",
                });
            }
            return res.status(200).json({ success: true, data: response });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.adminGetDocumetnByNickNameController = adminGetDocumetnByNickNameController;
