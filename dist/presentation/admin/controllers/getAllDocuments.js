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
exports.adminGetAllDocumentController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const adminGetAllDocumentController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield documentSchema_1.Document.find();
            if (!response)
                res.status(404).json({ success: false, message: "NOT FOUNT" });
            console.log("the all details for the usage ", response);
            return res.status(200).json({ success: true, data: response });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.adminGetAllDocumentController = adminGetAllDocumentController;
