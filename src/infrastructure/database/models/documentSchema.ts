
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
      file:{
        type: String,
        required: true,
      }
    //   salonList:{ type: Schema.Types.ObjectId, ref: "Theater" }]
    },
    {
        timestamps: true,
      }
)
export const Documet=model<DocumentEntity>("Document",DocumentSchema)