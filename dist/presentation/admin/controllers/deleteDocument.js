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
exports.adminDeleteDocumentController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
const adminDeleteDocumentController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { docToDelete } = req.params;
            const { language } = req.query;
            let response;
            if (language === "Arabic") {
                // Delete from ArabicDocument collection
                response = yield ArabicDocumentSchema_1.ArabicDocument.findByIdAndDelete({ _id: docToDelete });
            }
            else {
                // Delete from Document collection
                response = yield documentSchema_1.Document.findByIdAndDelete({ _id: docToDelete });
            }
            if (!response) {
                return res.status(404).json({ message: "Document not found", success: false });
            }
            return res.status(200).json({ message: "The document successfully Deleted", success: true, data: response });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.adminDeleteDocumentController = adminDeleteDocumentController;
