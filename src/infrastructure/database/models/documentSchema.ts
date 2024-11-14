
import { DocumentEntity } from "@/domain/entities/documentEntity";

import { model,Schema } from "mongoose";

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
      fileEn:{
        type: String,
        required: true,
      },
      fileAr:{
        type:String,
        required:true
      }
    //   salonList:{ type: Schema.Types.ObjectId, ref: "Theater" }]
    },
    {
        timestamps: true,
      }
)
export const Document=model<DocumentEntity>("Document",DocumentSchema)