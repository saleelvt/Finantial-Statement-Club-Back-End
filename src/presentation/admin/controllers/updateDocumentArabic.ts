import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { uploadFileToS3 } from "@/utilities/aws/s3";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}

export const updateDocumentArabicController = (dependencies: IAdminDependencies) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void|any|null > => {
    try {
      const { fullNameAr, nickNameAr, tadawalCode, sector } = req.body;
      const { id, language } = req.query;

      if (!id || !language) {
        return res.status(400).json({
          success: false,
          message: "ID and language are required to update the document",
        });
      }

      const requiredFields = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];
      const fileUrls: Record<string, { file: string | null; date: Date | null; year: string }> = {};

      let documentToUpdate = await ArabicDocument.findById(id);
      if (!documentToUpdate) {
        return res.status(404).json({
          success: false,
          message: "Document not found",
        });
      }

      const hasAtLeastOneFile = Object.keys(req.files || {}).some(
        key => requiredFields.includes(key) && req.files[key]?.length > 0
      );

      if (!hasAtLeastOneFile) {
        return res.status(400).json({
          success: false,
          message: "At least one file must be uploaded.",
        });
      }

      // ✅ Get existing years from formData
      const existingYears = new Set<string>();
      for (const fieldKey of requiredFields) {
        const year = documentToUpdate.formData?.[fieldKey]?.year;
        if (year) existingYears.add(year.trim());
      }

      // ✅ Get incoming years from uploaded files
      const incomingYears = new Set<string>();
      for (const fieldKey of requiredFields) {
        if (req.files?.[fieldKey]?.length > 0) {
          const year = req.body[`${fieldKey}Year`]?.trim();
          if (!year) {
            return res.status(400).json({
              success: false,
              message: `Year is required for field '${fieldKey}'`,
            });
          }
          incomingYears.add(year);
        }
      }

      // ✅ Rule 1: All uploaded files must have the same year
      if (incomingYears.size > 1) {
        return res.status(400).json({
          success: false,
          message: `All uploaded files must be for the same year. Got: ${Array.from(incomingYears).join(", ")}`,
        });
      }

      // ✅ Rule 2: If formData already contains a year, incoming year must match
      if (existingYears.size > 0) {
        const existingYear = Array.from(existingYears)[0];
        for (const y of incomingYears) {
          if (y !== existingYear) {
            return res.status(400).json({
              success: false,
              message: `Year mismatch: existing year is '${existingYear}', but got '${y}'`,
            });
          }
        }
      }

      // ✅ Update file fields
      for (const fieldKey of requiredFields) {
        const fileArray = req.files?.[fieldKey] || [];
        if (fileArray.length > 0) {
          const file = fileArray[0];
          const s3Url = await uploadFileToS3(file.buffer, file.originalname);
          const date = req.body[`${fieldKey}Date`]
            ? new Date(req.body[`${fieldKey}Date`])
            : documentToUpdate.formData?.[fieldKey]?.date;
          const year = req.body[`${fieldKey}Year`] || documentToUpdate.formData?.[fieldKey]?.year || "";

          fileUrls[fieldKey] = { file: s3Url, date, year };
        } else {
          const existingField = documentToUpdate.formData?.[fieldKey];
          fileUrls[fieldKey] = {
            file: existingField?.file || null,
            date: existingField?.date || null,
            year: existingField?.year || "",
          };
        }
      }

      // ✅ Update document
      documentToUpdate.fullNameAr = fullNameAr || documentToUpdate.fullNameAr;
      documentToUpdate.nickNameAr = nickNameAr || documentToUpdate.nickNameAr;
      documentToUpdate.tadawalCode = tadawalCode || documentToUpdate.tadawalCode;
      documentToUpdate.sector = sector || documentToUpdate.sector;
      documentToUpdate.formData = { ...documentToUpdate.formData, ...fileUrls };

      const updated = await ArabicDocument.findOneAndUpdate(
        { _id: id },
        documentToUpdate,
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Document updated successfully",
        data: updated,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
