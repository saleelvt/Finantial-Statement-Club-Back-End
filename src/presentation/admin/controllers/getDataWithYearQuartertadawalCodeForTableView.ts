import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { Request, Response, NextFunction } from "express";

export const adminGetDataWithYearQuartertadawalCodeForTableViewController = (
  dependencies: IAdminDependencies
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      const { year, quarterYear, tadawulCode } = req.query;

      if (!year || !quarterYear || !tadawulCode) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const quarter = String(quarterYear);
      const tadawul = String(tadawulCode);
      const yearStr = String(year);

      // Step 1: Find all matching documents for both English and Arabic
      const englishDocs = await Document.find({ tadawalCode: tadawul });
      const arabicDocs = await ArabicDocument.find({ tadawalCode: tadawul });

      // Helper to extract matched table based on quarter and year
      const findMatchingTable = (docs: any[]) => {
        for (const doc of docs) {
          const formData = doc.formData;

          const quarterData = formData?.[quarter];

          if (
            quarterData &&
            quarterData.file &&
            quarterData.year &&
            quarterData.year === yearStr
          ) {
            return quarterData.table;
          }
        }

        return null;
      };

      const englishTable = findMatchingTable(englishDocs);
      const arabicTable = findMatchingTable(arabicDocs);

      console.log("the back-end response fotghe data ", englishTable,arabicTable);
      

      // Return response
      return res.status(200).json({
        message: "Documents fetched successfully",
        success: true,
        englishTable,arabicTable
      });
    } catch (error) {
      next(error);
    }
  };
};
