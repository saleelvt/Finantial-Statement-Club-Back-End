import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] }; // Extend Request object to handle file uploads
}
export const adminAddDocumentArabicController = (dependencies: IAdminDependencies) => {
  console.log('dasdfdf saleel is a good boy ');
  
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
    console.log('___________', req.body);
    try {
     const { fullNameAr, nickNameAr, tadawalCode, sector } = req.body; 
     console.log("this is my req.files ", req.files, fullNameAr,nickNameAr);
    const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
    const fileUrls: Record<string, { file: string; date: Date; year: string }> = {};


        // Check if documents with the same Tadawal code already exist
          const existDocuments = await ArabicDocument.find({ tadawalCode: tadawalCode });
          if (existDocuments.length > 0) {
            console.log("Existing documents with Tadawal code: ", existDocuments);
    
            // Check each document's formData.Q1.year against the current Q1Year
            const q1YearFromRequest = req.body["Q1Year"] || "";
            for (const doc of existDocuments) {
              if (doc.formData?.Q1?.year === q1YearFromRequest) {
                return res.status(400).json({
                  success: false,
                  message: `File with Q1 year ${q1YearFromRequest} already exists in one of the documents.`,
                });
              }
            }
          }


     for (const fieldKey of requiredFields) {
        const fileArray = req.files[fieldKey];
     
        if (fileArray && fileArray.length > 0) { 

        const file = fileArray[0];
        const s3Url = await uploadFileToS3(file.buffer, file.originalname);
        const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
        const year = req.body[`${fieldKey}Year`] || "";
        fileUrls[fieldKey] = {
          file: s3Url,
          date,
          year,
        
        };
      } else {
        // If file is missing, set it as null
        fileUrls[fieldKey] = {
          file: null,
          date: null,
          year: "",
        };
      }

      }
      


      const newDocument = new ArabicDocument({
        fullNameAr: fullNameAr || "",
        nickNameAr: nickNameAr || "",
        tadawalCode: tadawalCode || "", 
        sector: sector || "",
        formData: fileUrls,
      });

      
      await newDocument.save();
     console.log("document arabic saved macha araaaaaaaaaaaaaaabbbbbbbbbbeeee ", newDocument);
    await newDocument.save();
      res.status(200).json({
        success: true,
        message: "Document created successfully",
        data: newDocument,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
};