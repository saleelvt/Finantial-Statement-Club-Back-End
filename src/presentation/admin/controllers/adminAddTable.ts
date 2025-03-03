import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { uploadTableFileToS3 } from "@/utilities/aws/TableS3";
interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const adminAddTableController = (dependencies: IAdminDependencies) => {
  return async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | null | any> => {
    try {
      const {
        nickName,
        tadawalCode,
        selectedYear,
        quarterYear,
        selectedTableType,
      } = req.body;
      const year = selectedYear;
      const section = quarterYear;
      const category = selectedTableType;
      console.log(
        "the kanaappi data : ",
        year,
        section,
        category,
        tadawalCode,
        nickName
      );
      if (!nickName || !tadawalCode || !year || !section || !category) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      console.log("Received files:", req.files, nickName, tadawalCode);

      // Find documents by tadawalCode
      const existingDocuments = await Document.find({ tadawalCode });
      if (existingDocuments.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "No documents found with the provided Tadawal code.",
          });
      }
      // Check if section.year matches req.body.year
      const matchedDocument = existingDocuments.find(
        (doc) => doc.formData?.[section]?.year === year
      );
      if (!matchedDocument) {
        return res
          .status(400)
          .json({
            success: false,
            message: `No matching document found for ${section} year: ${year}.`,
          });
      }
      if (!matchedDocument.formData[section].table) {
        console.log("not matched document back--dfdf");
        
        matchedDocument.formData[section].table = {
          BalanceSheet: null,
          ProfitLoss: null,
          CashFlow: null,
        };
      }
      await matchedDocument.save();  

      // Upload file to S3 and update the document
      if (req.files.screenshotFile && req.files.screenshotFile.length > 0) {
        const file = req.files.screenshotFile[0];
        const s3Url = await uploadTableFileToS3(file.buffer, file.originalname);
        console.log("the s3 url ", s3Url);

        // Ensure formData[section].table exists
    
        // Find the document and update it in one operation for better reliability
        const updatePath = `formData.${section}.table.${category}`; // Dynamic path

        const result = await Document.findOneAndUpdate(
          {
            tadawalCode,
            [`formData.${section}.year`]: year,
          },
          {
            $set: { [updatePath]: s3Url }, // Ensure proper path reference
          },
          { new: true, runValidators: true,upsert: true }
        );
          

        if (!result) {
          return res.status(400).json({
            success: false,
            message: `Failed to update document for ${section} year: ${year}.`,
          });
        }    
        return res.status(200).json({
          success: true,
          message: `Table Added Successfully in ${section}.table.${category}`,
          data: result,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "No valid file uploaded." });
      }
    } catch (error) {
      console.error("Error processing file upload:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  };
};
