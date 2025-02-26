import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const adminAddTableController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void|null|any> => {
    try {
      const { nickName, tadawalCode, year, section, category } = req.body;
      if (!nickName || !tadawalCode || !year || !section || !category) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      console.log("Received files:", req.files, nickName, tadawalCode);

      // Find documents by tadawalCode
      const existingDocuments = await Document.find({ tadawalCode });
      if (existingDocuments.length === 0) {
        return res.status(404).json({ success: false, message: "No documents found with the provided Tadawal code." });
      }

      // Check if section.year matches req.body.year
      const matchedDocument = existingDocuments.find(doc => doc.formData?.[section]?.year === year);
      if (!matchedDocument) {
        return res.status(400).json({ success: false, message: `No matching document found for ${section} year: ${year}.` });
      }

      // Upload file to S3 and update the document
      if (req.files && req.files[category]) {
        const file = req.files[category][0];
        const s3Url = await uploadFileToS3(file.buffer, file.originalname);
        
        // Ensure formData[section].table exists
        if (!matchedDocument.formData[section].table) {
          matchedDocument.formData[section].table = {};
        }
        
        matchedDocument.formData[section].table[category] = s3Url;
        await matchedDocument.save();

        return res.status(200).json({
          success: true,
          message: `File uploaded and stored successfully in ${section}.table.${category}`,
          data: matchedDocument,
        });
      } else {
        return res.status(400).json({ success: false, message: "No valid file uploaded." });
      }
    } catch (error) {
      console.error("Error processing file upload:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
};











// import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
// import { Request, Response, NextFunction } from "express";
// import { Document } from "@/infrastructure/database/models/documentSchema";
// import { uploadFileToS3 } from "@/utilities/aws/s3";

// interface CustomRequest extends Request {
//   files: { [fieldname: string]: Express.Multer.File[] }; // Extend Request object to handle file uploads
// }
// export const adminAddTableController = (dependencies: IAdminDependencies) => {

//   return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | null | any> => {
   
//     try {
//      const {  nickName, tadawalCode  } = req.body; 
//      console.log("this is my req.filesffffffffffff ", req.files, nickName,tadawalCode);
  
//     //     // Check if documents with the same Tadawal code already exist
//     //       const existDocuments = await Document.find({ tadawalCode: tadawalCode });
//     //       if (existDocuments.length > 0) {
//     //         console.log("Existing documents with Tadawal code: ", existDocuments);
    
//     //         // Check each document's formData.Q1.year against the current Q1Year
//     //         const q1YearFromRequest = req.body["Q1Year"] || "";
//     //         for (const doc of existDocuments) {
//     //           if (doc.formData?.Q1?.year === q1YearFromRequest) {
//     //             return res.status(400).json({
//     //               success: false,
//     //               message: `File with Q1 year ${q1YearFromRequest} already exists in one of the documents.`,
//     //             });
//     //           }
//     //         }
//     //       }


//     //  for (const fieldKey of requiredFields) {
//     //     const fileArray = req.files[fieldKey];
     
//     //     if (fileArray && fileArray.length > 0) { 

//     //     const file = fileArray[0];
//     //     const s3Url = await uploadFileToS3(file.buffer, file.originalname);
//     //     const date = req.body[`${fieldKey}Date`] ? new Date(req.body[`${fieldKey}Date`]) : null;
//     //     const year = req.body[`${fieldKey}Year`] || "";
//     //     fileUrls[fieldKey] = {
//     //       file: s3Url,
//     //       date,
//     //       year,
        
//     //     };
//     //   } else {
//     //     // If file is missing, set it as null
//     //     fileUrls[fieldKey] = {
//     //       file: null,
//     //       date: null,
//     //       year: "",
//     //     };
//     //   }

//     //   }
      


//     //   const newDocument = new Document({
//     //     fullNameAr: fullNameAr || "",
//     //     nickNameAr: nickNameAr || "",
//     //     tadawalCode: tadawalCode || "", 
//     //     sector: sector || "",
//     //     formData: fileUrls,
//     //   });

      
//     //   await newDocument.save();
//     //  console.log("document arabic saved macha araaaaaaaaaaaaaaabbbbbbbbbbeeee ", newDocument);
//     // await newDocument.save();
//     //   res.status(200).json({
//     //     success: true,
//     //     message: "Document created successfully",
//     //     data: newDocument,
//     //   });



//     } catch (error) {
//       console.error("Error creating document:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
// };