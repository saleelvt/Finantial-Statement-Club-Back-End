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
      Board: { type: FileSchema, required: false },
      Q1: { type: FileSchema, required: false },
      Q2: { type: FileSchema, required: false },
      Q3: { type: FileSchema, required: false },
      Q4: { type: FileSchema, required: false},
      S1: { type: FileSchema, required: false },
      Year: { type: FileSchema, required: false },
    },
  },
  {
    timestamps: true, 
  }
);

export const ArabicDocument = model("ArabicDocument", DocumentSchema);
