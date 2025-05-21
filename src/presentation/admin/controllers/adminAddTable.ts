import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

interface CustomRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] };
}
/**
 * Helper function to safely parse numeric values
 * @param value Value to parse
 * @returns Number or undefined
 */
const safeParseFloat = (value: any): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

/**
 * Helper function to ensure arrays are properly initialized
 * @param value Value to check
 * @returns Original array or empty array
 */
const ensureArray = (value: any): any[] => {
  return Array.isArray(value) ? value : [];
};

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
        data,
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
      console.log("this is the main data of the data: ", data);
      if (!tadawalCode || !year || !section || !category || !language) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }
      console.log("Received files:", language, tadawalCode);
      // Process the document based on language

      // Find existing documents with the provided Tadawal code

      if (language === "English") {
        const existingDocuments = await Document.find({ tadawalCode });

        // const existingDocuments = await DocumentModel.find({tadawalCode})
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
        // Initialize table object if it doesn't exist
        if (!matchedDocument.formData[section].table) {
          console.log("No table data found, initializing...");
          matchedDocument.formData[section].table = {
            BalanceSheet: {},
            ProfitLoss: null,
            CashFlow: null,
          };
        }
        // Process data for BalanceSheet if that's the selected table type
        if (category === "BalanceSheet" && data) {
          // Create the BalanceSheet object according to schema structure
          const balanceSheetData = {
            // Assets section
            assets: {
              current: {
                scurrentAssets: data.assets?.current?.scurrentAssets || "",
                currentLabels: ensureArray(
                  data.assets?.current?.currentLabelsAr
                ),
                CurrentAssetsNotes: ensureArray(
                  data.assets?.current?.CurrentAssetsNotes
                ),
                items: ensureArray(data.assets?.current?.items),
                itemsDate2: ensureArray(data.assets?.current?.itemsDate2),
                subItems: ensureArray(data.assets?.current?.subItems),
                currentSubLabels: ensureArray(
                  data.assets?.current?.currentSubLabelsAr
                ),
                subItemsDate2: ensureArray(data.assets?.current?.subItemsDate2),
                firstTotal: safeParseFloat(data.assets?.current?.firstTotal),
                firstTotalDate2: safeParseFloat(
                  data.assets?.current?.firstTotalDate2
                ),
                secondTotal: safeParseFloat(data.assets?.current?.secondTotal),
                secondTotalDate2: safeParseFloat(
                  data.assets?.current?.secondTotalDate2
                ),
                sfirtsTotalCurrentAssets:
                  data.assets?.current?.sfirtsTotalCurrentAssets || "",
                stotalCurrentAssets:
                  data.assets?.current?.stotalCurrentAssets || "",
              },
              nonCurrent: {
                snonCurrentAssets:
                  data.assets?.nonCurrent?.snonCurrentAssets || "",
                nonCurrentLabels: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentLabelsAr
                ),
                items: ensureArray(data.assets?.nonCurrent?.items),
                itemsDate2: ensureArray(data.assets?.nonCurrent?.itemsDate2),
                nonCurrentSubLabels: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentSubLabelsAr
                ),
                subItems: ensureArray(data.assets?.nonCurrent?.subItems),
                subItemsDate2: ensureArray(
                  data.assets?.nonCurrent?.subItemsDate2
                ),
                firstTotal: safeParseFloat(data.assets?.nonCurrent?.firstTotal),
                firstTotalDate2: safeParseFloat(
                  data.assets?.nonCurrent?.firstTotalDate2
                ),
                secondTotal: safeParseFloat(
                  data.assets?.nonCurrent?.secondTotal
                ),
                secondTotalDate2: safeParseFloat(
                  data.assets?.nonCurrent?.secondTotalDate2
                ),
                sfirtsTotalnonCurrentAssets:
                  data.assets?.nonCurrent?.sfirtsTotalnonCurrentAssets || "",
                stotalNonCurrentAssets:
                  data.assets?.nonCurrent?.stotalNonCurrentAssets || "",
                nonCurrentNotes: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentNotes
                ),
              },
              sassets: data.assets?.sassets || "",
              stotalAssets: data.assets?.stotalAssets || "",
              totalAssets: safeParseFloat(data.assets?.totalAssets),
              totalAssetsDate2: safeParseFloat(data.assets?.totalAssetsDate2),
            },
            // Additional data fields
            data1En: data.data1En || null,
            data2En: data.data2En || null,
            // Equity section
            equity: {
              sShareholdersEquity: data.equity?.sShareholdersEquity || "",
              equityLabels: ensureArray(data.equity?.equityLabelsAr),
              items: ensureArray(data.equity?.items),
              itemsDate2: ensureArray(data.equity?.itemsDate2),
              equitySubLabels: ensureArray(data.equity?.equitySubLabelsAr),
              subItems: ensureArray(data.equity?.subItems),
              subItemsDate2: ensureArray(data.equity?.subItemsDate2),
              firstTotal: safeParseFloat(data.equity?.firstTotal),
              firstTotalDate2: safeParseFloat(data.equity?.firstTotalDate2),
              sfirtsTotalShareholdersEquity:
                data.equity?.sfirtsTotalShareholdersEquity || "",
              stotalShareholdersEquity:
                data.equity?.stotalShareholdersEquity || "",
              totalEquity: safeParseFloat(data.equity?.totalEquity),
              totalEquityDate2: safeParseFloat(data.equity?.totalEquityDate2),
              equityItemsNotes: ensureArray(data.equity?.equityItemsNotes),
            },

            // Liabilities section
            liabilities: {
              liabilities: data.liabilities?.liabilities || "",

              current: {
                scurrentliabilities:
                  data.liabilities?.current?.scurrentliabilities || "",
                currentLiabilitiesLabels: ensureArray(
                  data.liabilities?.current?.currentLiabilitiesLabelsAr
                ),
                currentLiabilitiesSubLabels: ensureArray(
                  data.liabilities?.current?.currentSubLiabilitiesLabelsAr
                ),
                items: ensureArray(data.liabilities?.current?.items),
                itemsDate2: ensureArray(data.liabilities?.current?.itemsDate2),
                subItems: ensureArray(data.liabilities?.current?.subItems),
                subItemsDate2: ensureArray(
                  data.liabilities?.current?.subItemsDate2
                ),
                firstTotal: safeParseFloat(
                  data.liabilities?.current?.firstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.liabilities?.current?.firstTotalDate2
                ),
                sfirtsTotalcurrentLiabilities:
                  data.liabilities?.current?.sfirtsTotalcurrentLiabilities ||
                  "",
                stotalcurrentliabilities:
                  data.liabilities?.current?.stotalcurrentliabilities || "",
                total: safeParseFloat(data.liabilities?.current?.total),
                totalDate2: safeParseFloat(
                  data.liabilities?.current?.totalDate2
                ),
                currentLiabilitiesNotes: ensureArray(
                  data.liabilities?.current?.currentLiabilitiesNotes
                ),
              },

              nonCurrent: {
                sNoncurrentliabilities:
                  data.liabilities?.nonCurrent?.sNoncurrentliabilities || "",
                NonCurrentLiabilitiesLabels: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentLiabilitiesLabelsAr
                ),
                items: ensureArray(data.liabilities?.nonCurrent?.items),
                itemsDate2: ensureArray(
                  data.liabilities?.nonCurrent?.itemsDate2
                ),
                NonCurrentLiabilitiesSubLabels: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentSubLiabilitiesLabelsAr
                ),
                subItems: ensureArray(data.liabilities?.nonCurrent?.subItems),
                subItemsDate2: ensureArray(
                  data.liabilities?.nonCurrent?.subItemsDate2
                ),
                firstTotal: safeParseFloat(
                  data.liabilities?.nonCurrent?.firstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.liabilities?.nonCurrent?.firstTotalDate2
                ),
                sfirtsTotalNoncurrentLiabilities:
                  data.liabilities?.nonCurrent
                    ?.sfirtsTotalNoncurrentLiabilities || "",
                stotalNoncurrentliabilities:
                  data.liabilities?.nonCurrent?.stotalNoncurrentliabilities ||
                  "",
                total: safeParseFloat(data.liabilities?.nonCurrent?.total),
                totalDate2: safeParseFloat(
                  data.liabilities?.nonCurrent?.totalDate2
                ),
                nonCurrentLiabilitiesNotes: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentLiabilitiesNotes
                ),
              },
              stotalliabilities: data.liabilities?.stotalliabilities || "",
              totalLiabilities: safeParseFloat(
                data.liabilities?.totalLiabilities
              ),
              totalLiabilitiesDate2: safeParseFloat(
                data.liabilities?.totalLiabilitiesDate2
              ),
            },

            // Section headings and totals
            sShareholdersEquityandliabilitiess:
              data?.sShareholdersEquityandliabilitiess || "",
            stotalEquityAndLiabilities: data?.stotalEquityAndLiabilities || "",

            // Total values at the balance sheet level
            ItotalEquityAndLiabilities: safeParseFloat(
              data?.ItotalEquityAndLiabilities
            ),
            ItotalEquityAndLiabilitiesDate2: safeParseFloat(
              data?.ItotalEquityAndLiabilitiesDate2
            ),
          };

          // Debug logging to confirm total values are being set correctly
          console.log("Total values being saved:");
          console.log("Assets Total:", balanceSheetData.assets.totalAssets);
          console.log(
            "Assets Total Date2:",
            balanceSheetData.assets.totalAssetsDate2
          );
          console.log("Equity Total:", balanceSheetData.equity.totalEquity);
          console.log(
            "Equity Total Date2:",
            balanceSheetData.equity.totalEquityDate2
          );
          console.log(
            "Liabilities Total:",
            balanceSheetData.liabilities.totalLiabilities
          );
          console.log(
            "Liabilities Total Date2:",
            balanceSheetData.liabilities.totalLiabilitiesDate2
          );
          console.log(
            "Total Equity & Liabilities:",
            balanceSheetData.ItotalEquityAndLiabilities
          );
          console.log(
            "Total Equity & Liabilities Date2:",
            balanceSheetData.ItotalEquityAndLiabilitiesDate2
          );

          // Update the BalanceSheet data in the document
          matchedDocument.formData[section].table.BalanceSheet =
            balanceSheetData;

          // Save the updated document with error handling
          try {
            await matchedDocument.save();
            console.log("Document saved successfully");

            // Verify the saved totals by retrieving the document
            const verifiedDoc = await Document.findById(matchedDocument._id);
            const savedBalanceSheet =
              verifiedDoc?.formData[section]?.table?.BalanceSheet;
            console.log("Verification - Total values after save:");
            console.log(
              "Assets Total:",
              savedBalanceSheet?.assets?.totalAssets
            );
            console.log(
              "Equity Total:",
              savedBalanceSheet?.equity?.totalEquity
            );
            console.log(
              "Liabilities Total:",
              savedBalanceSheet?.liabilities?.totalLiabilities
            );

            return res.status(200).json({
              success: true,
              message: "Balance sheet data saved successfully.",
              Tabledata: matchedDocument.formData[section].table.BalanceSheet,
            });
          } catch (saveError) {
            console.error("Error saving document:", saveError);
            return res.status(500).json({
              success: false,
              message: "Error saving document",
              error: saveError.message,
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid table category or missing data.",
          });
        }
      } else if (language === "Arabic") {
        const existingDocuments = await ArabicDocument.find({ tadawalCode });

        console.log("the back-end Arabic doc finded : ", existingDocuments);

        // const existingDocuments = await DocumentModel.find({tadawalCode})
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
        // Initialize table object if it doesn't exist
        if (!matchedDocument.formData[section].table) {
          console.log("No table data found, initializing...");
          matchedDocument.formData[section].table = {
            BalanceSheet: {},
            ProfitLoss: null,
            CashFlow: null,
          };
        }
        // Process data for BalanceSheet if that's the selected table type
        if (category === "BalanceSheet" && data) {
          // Create the BalanceSheet object according to schema structure
          const balanceSheetData = {
            // Assets section
            assets: {
              current: {
                scurrentAssets: data.assets?.current?.scurrentAssets || "",
                currentLabels: ensureArray(
                  data.assets?.current?.currentLabelsAr
                ),
                CurrentAssetsNotes: ensureArray(
                  data.assets?.current?.CurrentAssetsNotes
                ),
                items: ensureArray(data.assets?.current?.items),
                itemsDate2: ensureArray(data.assets?.current?.itemsDate2),
                subItems: ensureArray(data.assets?.current?.subItems),
                currentSubLabels: ensureArray(
                  data.assets?.current?.currentSubLabelsAr
                ),
                subItemsDate2: ensureArray(data.assets?.current?.subItemsDate2),
                firstTotal: safeParseFloat(data.assets?.current?.firstTotal),
                firstTotalDate2: safeParseFloat(
                  data.assets?.current?.firstTotalDate2
                ),
                secondTotal: safeParseFloat(data.assets?.current?.secondTotal),
                secondTotalDate2: safeParseFloat(
                  data.assets?.current?.secondTotalDate2
                ),
                sfirtsTotalCurrentAssets:
                  data.assets?.current?.sfirtsTotalCurrentAssets || "",
                stotalCurrentAssets:
                  data.assets?.current?.stotalCurrentAssets || "",
              },
              nonCurrent: {
                snonCurrentAssets:
                  data.assets?.nonCurrent?.snonCurrentAssets || "",
                nonCurrentLabels: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentLabelsAr
                ),
                items: ensureArray(data.assets?.nonCurrent?.items),
                itemsDate2: ensureArray(data.assets?.nonCurrent?.itemsDate2),
                nonCurrentSubLabels: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentSubLabelsAr
                ),
                subItems: ensureArray(data.assets?.nonCurrent?.subItems),
                subItemsDate2: ensureArray(
                  data.assets?.nonCurrent?.subItemsDate2
                ),
                firstTotal: safeParseFloat(data.assets?.nonCurrent?.firstTotal),
                firstTotalDate2: safeParseFloat(
                  data.assets?.nonCurrent?.firstTotalDate2
                ),
                secondTotal: safeParseFloat(
                  data.assets?.nonCurrent?.secondTotal
                ),
                secondTotalDate2: safeParseFloat(
                  data.assets?.nonCurrent?.secondTotalDate2
                ),
                sfirtsTotalnonCurrentAssets:
                  data.assets?.nonCurrent?.sfirtsTotalnonCurrentAssets || "",
                stotalNonCurrentAssets:
                  data.assets?.nonCurrent?.stotalNonCurrentAssets || "",
                nonCurrentNotes: ensureArray(
                  data.assets?.nonCurrent?.nonCurrentNotes
                ),
              },
              sassets: data.assets?.sassets || "",
              stotalAssets: data.assets?.stotalAssets || "",
              totalAssets: safeParseFloat(data.assets?.totalAssets),
              totalAssetsDate2: safeParseFloat(data.assets?.totalAssetsDate2),
            },
            // Additional data fields
            data1En: data.data1En || null,
            data2En: data.data2En || null,
            // Equity section
            equity: {
              sShareholdersEquity: data.equity?.sShareholdersEquity || "",
              equityLabels: ensureArray(data.equity?.equityLabelsAr),
              items: ensureArray(data.equity?.items),
              itemsDate2: ensureArray(data.equity?.itemsDate2),
              equitySubLabels: ensureArray(data.equity?.equitySubLabelsAr),
              subItems: ensureArray(data.equity?.subItems),
              subItemsDate2: ensureArray(data.equity?.subItemsDate2),
              firstTotal: safeParseFloat(data.equity?.firstTotal),
              firstTotalDate2: safeParseFloat(data.equity?.firstTotalDate2),
              sfirtsTotalShareholdersEquity:
                data.equity?.sfirtsTotalShareholdersEquity || "",
              stotalShareholdersEquity:
                data.equity?.stotalShareholdersEquity || "",
              totalEquity: safeParseFloat(data.equity?.totalEquity),
              totalEquityDate2: safeParseFloat(data.equity?.totalEquityDate2),
              equityItemsNotes: ensureArray(data.equity?.equityItemsNotes),
            },

            // Liabilities section
            liabilities: {
              liabilities: data.liabilities?.liabilities || "",
              current: {
                scurrentliabilities:
                  data.liabilities?.current?.scurrentliabilities || "",
                currentLiabilitiesLabels: ensureArray(
                  data.liabilities?.current?.currentLiabilitiesLabelsAr
                ),
                currentLiabilitiesSubLabels: ensureArray(
                  data.liabilities?.current?.currentSubLiabilitiesLabelsAr
                ),
                items: ensureArray(data.liabilities?.current?.items),
                itemsDate2: ensureArray(data.liabilities?.current?.itemsDate2),
                subItems: ensureArray(data.liabilities?.current?.subItems),
                subItemsDate2: ensureArray(
                  data.liabilities?.current?.subItemsDate2
                ),
                firstTotal: safeParseFloat(
                  data.liabilities?.current?.firstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.liabilities?.current?.firstTotalDate2
                ),
                sfirtsTotalcurrentLiabilities:
                  data.liabilities?.current?.sfirtsTotalcurrentLiabilities ||
                  "",
                stotalcurrentliabilities:
                  data.liabilities?.current?.stotalcurrentliabilities || "",
                total: safeParseFloat(data.liabilities?.current?.total),
                totalDate2: safeParseFloat(
                  data.liabilities?.current?.totalDate2
                ),
                currentLiabilitiesNotes: ensureArray(
                  data.liabilities?.current?.currentLiabilitiesNotes
                ),
              },
              nonCurrent: {
                sNoncurrentliabilities:
                  data.liabilities?.nonCurrent?.sNoncurrentliabilities || "",
                NonCurrentLiabilitiesLabels: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentLiabilitiesLabelsAr
                ),
                items: ensureArray(data.liabilities?.nonCurrent?.items),
                itemsDate2: ensureArray(
                  data.liabilities?.nonCurrent?.itemsDate2
                ),
                NonCurrentLiabilitiesSubLabels: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentSubLiabilitiesLabelsAr
                ),
                subItems: ensureArray(data.liabilities?.nonCurrent?.subItems),
                subItemsDate2: ensureArray(
                  data.liabilities?.nonCurrent?.subItemsDate2
                ),
                firstTotal: safeParseFloat(
                  data.liabilities?.nonCurrent?.firstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.liabilities?.nonCurrent?.firstTotalDate2
                ),
                sfirtsTotalNoncurrentLiabilities:
                  data.liabilities?.nonCurrent
                    ?.sfirtsTotalNoncurrentLiabilities || "",
                stotalNoncurrentliabilities:
                  data.liabilities?.nonCurrent?.stotalNoncurrentliabilities ||
                  "",
                total: safeParseFloat(data.liabilities?.nonCurrent?.total),
                totalDate2: safeParseFloat(
                  data.liabilities?.nonCurrent?.totalDate2
                ),
                nonCurrentLiabilitiesNotes: ensureArray(
                  data.liabilities?.nonCurrent?.nonCurrentLiabilitiesNotes
                ),
              },
              stotalliabilities: data.liabilities?.stotalliabilities || "",
              totalLiabilities: safeParseFloat(
                data.liabilities?.totalLiabilities
              ),
              totalLiabilitiesDate2: safeParseFloat(
                data.liabilities?.totalLiabilitiesDate2
              ),
            },

            // Section headings and totals
            sShareholdersEquityandliabilitiess:
              data?.sShareholdersEquityandliabilitiess || "",
            stotalEquityAndLiabilities: data?.stotalEquityAndLiabilities || "",

            // Total values at the balance sheet level
            ItotalEquityAndLiabilities: safeParseFloat(
              data?.ItotalEquityAndLiabilities
            ),
            ItotalEquityAndLiabilitiesDate2: safeParseFloat(
              data?.ItotalEquityAndLiabilitiesDate2
            ),
          };

          // Debug logging to confirm total values are being set correctly
          console.log("Total values being saved:");
          console.log("Assets Total:", balanceSheetData.assets.totalAssets);
          console.log(
            "Assets Total Date2:",
            balanceSheetData.assets.totalAssetsDate2
          );
          console.log("Equity Total:", balanceSheetData.equity.totalEquity);
          console.log(
            "Equity Total Date2:",
            balanceSheetData.equity.totalEquityDate2
          );
          console.log(
            "Liabilities Total:",
            balanceSheetData.liabilities.totalLiabilities
          );
          console.log(
            "Liabilities Total Date2:",
            balanceSheetData.liabilities.totalLiabilitiesDate2
          );
          console.log(
            "Total Equity & Liabilities:",
            balanceSheetData.ItotalEquityAndLiabilities
          );
          console.log(
            "Total Equity & Liabilities Date2:",
            balanceSheetData.ItotalEquityAndLiabilitiesDate2
          );

          // Update the BalanceSheet data in the document
          matchedDocument.formData[section].table.BalanceSheet =
            balanceSheetData;

          // Save the updated document with error handling
          try {
            await matchedDocument.save();
            console.log("Document saved successfully");

            // Verify the saved totals by retrieving the document
            const verifiedDoc = await ArabicDocument.findById(
              matchedDocument._id
            );
            const savedBalanceSheet =
              verifiedDoc?.formData[section]?.table?.BalanceSheet;
            console.log("Verification - Total values after save:");
            console.log(
              "Assets Total:",
              savedBalanceSheet?.assets?.totalAssets
            );
            console.log(
              "Equity Total:",
              savedBalanceSheet?.equity?.totalEquity
            );
            console.log(
              "Liabilities Total:",
              savedBalanceSheet?.liabilities?.totalLiabilities
            );

            return res.status(200).json({
              success: true,
              message: "Balance sheet  Arabic data saved successfully.",
              Tabledata: matchedDocument.formData[section].table.BalanceSheet,
            });
          } catch (saveError) {
            console.error("Error saving document:", saveError);
            return res.status(500).json({
              success: false,
              message: "Error saving document",
              error: saveError.message,
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid table category or missing data.",
          });
        }
      }
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  };
};
