"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArabicDocument = void 0;
const mongoose_1 = require("mongoose");
const FileSchema = new mongoose_1.Schema({
    file: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
});
const DocumentSchema = new mongoose_1.Schema({
    fullNameAr: {
        type: String,
        required: true,
    },
    nickNameAr: {
        type: String,
        required: true,
    },
    tadawalCode: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    formData: {
        Board: { type: FileSchema, required: false },
        Q1: { type: FileSchema, required: false },
        Q2: { type: FileSchema, required: false },
        Q3: { type: FileSchema, required: false },
        Q4: { type: FileSchema, required: false },
        S1: { type: FileSchema, required: false },
        Year: { type: FileSchema, required: false },
    },
}, {
    timestamps: true,
});
exports.ArabicDocument = (0, mongoose_1.model)("ArabicDocument", DocumentSchema);
