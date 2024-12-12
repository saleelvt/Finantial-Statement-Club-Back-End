import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const updateDocumentEnglishController = (dependencies: IAdminDependencies) => {
    return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
      try {
        const { fullNameEn, nickNameEn, tadawalCode, sector } = req.body;
        const { id, language } = req.query;
  
        if (!id || !language) {
          return res.status(400).json({ success: false, message: "ID and language are required to update the document" });
        }
  
        const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
        const fileUrls: Record<string, { file: string | null; date: Date | null; year: string }> = {};
  
        let documentToUpdate = await Document.findById(id);
        if (!documentToUpdate) {
          return res.status(404).json({
            success: false,
            message: "Document not found",
          });
        }
  
        console.log("Received Request Body:", req.body);
        console.log("Received Request Files:", req.files);
  
        for (const fieldKey of requiredFields) {
          const fileArray = req.files?.[fieldKey] || [];
          if (fileArray.length > 0) {
            const file = fileArray[0];
            const s3Url = await uploadFileToS3(file.buffer, file.originalname);
            const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : documentToUpdate.formData?.[fieldKey]?.date;
            const year = req.body[`${fieldKey}Year`] || documentToUpdate.formData?.[fieldKey]?.year || "";
  
            fileUrls[fieldKey] = { file: s3Url, date, year };
          } else {
            const existingField = documentToUpdate.formData?.[fieldKey];
            fileUrls[fieldKey] = {
              file: existingField?.file,
              date: existingField?.date ,
              year: existingField?.year ,
            };
          }
        }
        
  
        documentToUpdate.fullNameEn = fullNameEn || documentToUpdate.fullNameEn;
        documentToUpdate.nickNameEn = nickNameEn || documentToUpdate.nickNameEn;
        documentToUpdate.tadawalCode = tadawalCode || documentToUpdate.tadawalCode;
        documentToUpdate.sector = sector || documentToUpdate.sector;
        documentToUpdate.formData = { ...documentToUpdate.formData, ...fileUrls };

        

        console.log("my loged document current fullname ",  documentToUpdate.fullNameEn );
        console.log("my loged document current nICK name ",  documentToUpdate.nickNameEn );
        console.log("my loged document current TADAWAL name ",  documentToUpdate.tadawalCode );
        console.log("my loged document current sector name ",  documentToUpdate.sector );
        console.log("my loged document current formData ",  documentToUpdate.formData )
        try {
            var last = await Document.findOneAndUpdate(
                { _id: id }, 
                documentToUpdate, 
                { 
                  new: true,  // Return the modified document
                  upsert: true,  // Create a new doc if no match is found
                  runValidators: true  // Run model validations
                }
              );
          console.log("Document saved successfully:", last);
        } catch (error) {
          console.error("Error saving document:", error);
          return res.status(500).json({ success: false, message: "Failed to save document" });
        }
        res.status(200).json({
          success: true,
          message: "Document updated successfully",
          data: last,
        });
      } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
  };
  