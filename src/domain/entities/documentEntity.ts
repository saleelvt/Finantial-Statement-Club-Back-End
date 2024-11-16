import { ObjectId } from "mongoose";

export interface DocumentEntity {
  _id: ObjectId;
  companyNameAr?: string;
  companyNameEn: string;
  yearOfReport: string;
  fileEn?: {
    data: Buffer;
    contentType: string;
  };
  fileAr?: {
    data: Buffer;
    contentType: string;
  };
}
