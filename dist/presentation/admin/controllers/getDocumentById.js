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
const adminGetDocumentByIdController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { language } = req.query;
            const id = req.params.id;
            console.log("backend - ", id, language);
            if (!id || !language) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required query parameters: id or userLanguage",
                });
            }
            let response;
            if (language === "Arabic") {
                response = yield ArabicDocumentSchema_1.ArabicDocument.find({ _id: id });
                if (!response) {
                    return res.status(404).json({
                        success: false,
                        message: "Document not found for the given Arabic id",
                    });
                }
            }
            else if (language === "English") {
                response = yield documentSchema_1.Document.find({ _id: id });
                if (!response) {
                    return res.status(404).json({
                        success: false,
                        message: "Document not found for the given doc id ",
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
exports.adminGetDocumentByIdController = adminGetDocumentByIdController;
