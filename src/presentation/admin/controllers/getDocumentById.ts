import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { Request, Response, NextFunction } from "express";

const formKeys = ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"];

export const adminGetDocumentByIdController = (
  dependencies: IAdminDependencies 
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void|null|any> => {
    try {
      const { language } = req.query;
      const id = req.params.id;

      if (!id || !language) {
        return res.status(400).json({
          success: false,
          message: "Missing required query parameters: id or language",
        });
      }

      let mainDoc: any = null;
      let oppositeDoc: any = null;
      if (language === "Arabic") {
        mainDoc = await ArabicDocument.findById(id);
        if (!mainDoc) {
          return res.status(404).json({
            success: false,
            message: "Arabic document not found",
          });
        }
        // extract a valid year from Arabic document
        const arabicYear = getFirstValidYear(mainDoc.formData);
        if (arabicYear && mainDoc.tadawalCode) {
          oppositeDoc = await Document.findOne({
            tadawalCode: mainDoc.tadawalCode,
          });

          if (
            oppositeDoc &&
            hasMatchingYear(oppositeDoc.formData, arabicYear)
          ) {
            // match found, return both
            return res.status(200).json({
              success: true,
              data: {
                data: mainDoc,
                matchedOppositeLanguageDoc: oppositeDoc,
              },
            });
          }
        }
        return res.status(200).json({
          success: true,
          data: {
            data: mainDoc,
          },
        });

      } else if (language === "English") {

        console.log("english section ocupid: ",language);
        
        mainDoc = await Document.findById(id);
        if (!mainDoc) {
          return res.status(404).json({
            success: false,
            message: "English document not found",
          });
        }
        console.log("my main doc: ",mainDoc);
        
        // extract a valid year from English document
        const englishYear = getFirstValidYear(mainDoc.formData);
        if (englishYear && mainDoc.tadawalCode) {
          oppositeDoc = await ArabicDocument.findOne({
            tadawalCode: mainDoc.tadawalCode,
          });

          if (
            oppositeDoc &&
            hasMatchingYear(oppositeDoc.formData, englishYear)
          ) {
            // match found, return both
            return res.status(200).json({
              success: true,
              data: {
                data: mainDoc,
                matchedOppositeLanguageDoc: oppositeDoc,
              },
            });
          }
        }
        return res.status(200).json({
          success: true,
          data: {
            data: mainDoc,
          },
        });

      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid language provided",
        });
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

// Extract first valid year from formData fields
function getFirstValidYear(formData: any): string | null {
  for (const key of formKeys) {
    if (formData?.[key]?.year) {
      return formData[key].year.trim();
    }
  }
  return null;
}

// Check if any field in formData matches the given year
function hasMatchingYear(formData: any, targetYear: string): boolean {
  for (const key of formKeys) {
    if (formData?.[key]?.year?.trim() === targetYear) {
      return true;
    }
  }
  return false;
}
