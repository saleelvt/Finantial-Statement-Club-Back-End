import { model, Schema } from "mongoose";


const FileSchema = new Schema({
  file: {
    type: String, 
    required: false,
  },

  date: {
    type: Date,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const DocumentSchema = new Schema(
  {
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
      Board: { type: FileSchema, required: true },
      Q1: { type: FileSchema, required: true },
      Q2: { type: FileSchema, required: true },
      Q3: { type: FileSchema, required: true },
      Q4: { type: FileSchema, required: true },
      S1: { type: FileSchema, required: true },
      Year: { type: FileSchema, required: true },
    },
  },
  {
    timestamps: true, 
  }
);

export const ArabicDocument = model("ArabicDocument", DocumentSchema);