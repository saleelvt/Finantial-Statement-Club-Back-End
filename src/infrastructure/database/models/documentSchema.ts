import { DocumentEntity } from "@/domain/entities/documentEntity";
import { model, Schema } from "mongoose";

const DocumentSchema = new Schema<DocumentEntity>({
  companyNameAr: {
    type: String,
    required: true,
  },
  companyNameEn: {
    type: String,
    required: true,
  },
  yearOfReport: {
    type: String,
    required: true,
  },
  fileEn: {
    data: Buffer,
    contentType: String,
  },
  fileAr: {
    data: Buffer,
    contentType: String,
  }
}, {
  timestamps: true,
});

export const Document = model<DocumentEntity>("Document", DocumentSchema);
