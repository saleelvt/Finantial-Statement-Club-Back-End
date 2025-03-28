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
exports.updateDocumentEnglishController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const s3_1 = require("@/utilities/aws/s3");
const updateDocumentEnglishController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        try {
            const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
            const { id, language } = req.query;
            if (!id || !language) {
                return res.status(400).json({ success: false, message: "ID and language are required to update the document" });
            }
            const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
            const fileUrls = {};
            let documentToUpdate = yield documentSchema_1.Document.findById(id);
            if (!documentToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found",
                });
            }
            console.log("Received Request Body:", req.body);
            console.log("Received Request Files:", req.files);
            for (const fieldKey of requiredFields) {
                const fileArray = ((_a = req.files) === null || _a === void 0 ? void 0 : _a[fieldKey]) || [];
                if (fileArray.length > 0) {
                    const file = fileArray[0];
                    const s3Url = yield (0, s3_1.uploadFileToS3)(file.buffer, file.originalname);
                    const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : (_c = (_b = documentToUpdate.formData) === null || _b === void 0 ? void 0 : _b[fieldKey]) === null || _c === void 0 ? void 0 : _c.date;
                    const year = req.body[`${fieldKey}Year`] || ((_e = (_d = documentToUpdate.formData) === null || _d === void 0 ? void 0 : _d[fieldKey]) === null || _e === void 0 ? void 0 : _e.year) || "";
                    fileUrls[fieldKey] = { file: s3Url, date, year };
                }
                else {
                    const existingField = (_f = documentToUpdate.formData) === null || _f === void 0 ? void 0 : _f[fieldKey];
                    fileUrls[fieldKey] = {
                        file: existingField === null || existingField === void 0 ? void 0 : existingField.file,
                        date: existingField === null || existingField === void 0 ? void 0 : existingField.date,
                        year: existingField === null || existingField === void 0 ? void 0 : existingField.year,
                    };
                }
            }
            documentToUpdate.fullNameEn = fullNameEn || documentToUpdate.fullNameEn;
            documentToUpdate.nickNameEn = nickNameEn || documentToUpdate.nickNameEn;
            documentToUpdate.tadawalCode = tadawalCode || documentToUpdate.tadawalCode;
            documentToUpdate.sector = sector || documentToUpdate.sector;
            documentToUpdate.formData = Object.assign(Object.assign({}, documentToUpdate.formData), fileUrls);
            console.log("my loged document current fullname ", documentToUpdate.fullNameEn);
            console.log("my loged document current nICK name ", documentToUpdate.nickNameEn);
            console.log("my loged document current TADAWAL name ", documentToUpdate.tadawalCode);
            console.log("my loged document current sector name ", documentToUpdate.sector);
            console.log("my loged document current formData ", documentToUpdate.formData);
            try {
                var last = yield documentSchema_1.Document.findOneAndUpdate({ _id: id }, documentToUpdate, {
                    new: true,
                    upsert: true,
                    runValidators: true // Run model validations
                });
                console.log("Document saved successfully:", last);
            }
            catch (error) {
                console.error("Error saving document:", error);
                return res.status(500).json({ success: false, message: "Failed to save document" });
            }
            res.status(200).json({
                success: true,
                message: "Document updated successfully",
                data: last,
            });
        }
        catch (error) {
            console.error("Error updating document:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });
};
exports.updateDocumentEnglishController = updateDocumentEnglishController;
