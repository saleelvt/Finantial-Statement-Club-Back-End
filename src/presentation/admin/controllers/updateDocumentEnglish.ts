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
        return res.status(400).json({
          success: false,
          message: "ID and language are required to update the document",
        });
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

      const hasAtLeastOneFile = Object.keys(req.files || {}).some(
        key => requiredFields.includes(key) && req.files[key]?.length > 0
      );

      if (!hasAtLeastOneFile) {
        return res.status(400).json({
          success: false,
          message: "At least one file must be uploaded.",
        });
      }
      
      const existingYears = new Set<string>();
      for (const fieldKey of requiredFields) {
        const year = documentToUpdate.formData?.[fieldKey]?.year;
        if (year) existingYears.add(year.trim());
      }

      // ✅ Collect all incoming years from uploaded files
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

      if (incomingYears.size > 1) {
        return res.status(400).json({
          success: false,
          message: `All uploaded files must be for the same year. Got: ${Array.from(incomingYears).join(", ")}`,
        });
      }

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
            file: existingField?.file || null,
            date: existingField?.date || null,
            year: existingField?.year || "",
          };
        }
      }

      documentToUpdate.fullNameEn = fullNameEn || documentToUpdate.fullNameEn;
      documentToUpdate.nickNameEn = nickNameEn || documentToUpdate.nickNameEn;
      documentToUpdate.tadawalCode = tadawalCode || documentToUpdate.tadawalCode;
      documentToUpdate.sector = sector || documentToUpdate.sector;
      documentToUpdate.formData = { ...documentToUpdate.formData, ...fileUrls };

      const updatedDocument = await Document.findOneAndUpdate(
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
        data: updatedDocument,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
};
