import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
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
        tadawalCode,
        selectedYear,
        quarterYear,
        selectedTableType,
        language,
      } = req.body;
    
      const year = selectedYear;
      const section = quarterYear;
      const category = selectedTableType;
      
      console.log(
        "Received Data:",
        year,
        section,
        category,
        tadawalCode,
        language
      );

      if ( !tadawalCode || !year || !section || !category || !language) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      console.log("Received files:", req.files,  tadawalCode);

      // Use separate code paths for Arabic and non-Arabic documents
      if (language === "Arabic") {
        // Process Arabic documents
        const existingDocuments = await ArabicDocument.find({ tadawalCode });
        if (existingDocuments.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No documents found with the provided Tadawal code.",
          });
        }

        // Check if section.year matches req.body.year
        const matchedDocument = existingDocuments.find(
          (doc) => doc.formData?.[section]?.year === year
        );

        if (!matchedDocument) {
          return res.status(400).json({
            success: false,
            message: `No matching document found for ${section} year: ${year}.`,
          });
        }

        if (!matchedDocument.formData[section].table) {
          console.log("No table data found, initializing...");
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
          console.log("Uploaded to S3:", s3Url);

          // Dynamic path for update
          const updatePath = `formData.${section}.table.${category}`;

          const result = await ArabicDocument.findOneAndUpdate(
            {
              tadawalCode,
              [`formData.${section}.year`]: year,
            },
            {
              $set: { [updatePath]: s3Url },
            },
            { new: true, runValidators: true, upsert: true }
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
          return res.status(400).json({ success: false, message: "No valid file uploaded." });
        }
      } else {
        // Process English documents
        const existingDocuments = await Document.find({ tadawalCode });
        if (existingDocuments.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No documents found with the provided Tadawal code.",
          });
        }

        // Check if section.year matches req.body.year
        const matchedDocument = existingDocuments.find(
          (doc) => doc.formData?.[section]?.year === year
        );

        if (!matchedDocument) {
          return res.status(400).json({
            success: false,
            message: `No matching document found for ${section} year: ${year}.`,
          });
        }

        if (!matchedDocument.formData[section].table) {
          console.log("No table data found, initializing...");
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
          console.log("Uploaded to S3:", s3Url);

          // Dynamic path for update
          const updatePath = `formData.${section}.table.${category}`;

          const result = await Document.findOneAndUpdate(
            {
              tadawalCode,
              [`formData.${section}.year`]: year,
            },
            {
              $set: { [updatePath]: s3Url },
            },
            { new: true, runValidators: true, upsert: true }
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
          return res.status(400).json({ success: false, message: "No valid file uploaded." });
        }
      }
    } catch (error) {
      console.error("Error processing file upload:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
};