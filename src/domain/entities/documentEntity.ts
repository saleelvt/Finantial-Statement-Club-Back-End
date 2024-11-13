import { ObjectId } from "mongoose";

export interface DocumentEntity {
    _id:ObjectId;
    companyNameAr?:string;
    companyNameEn:string;
    yearOfReport:string;
    file?:string;
}

