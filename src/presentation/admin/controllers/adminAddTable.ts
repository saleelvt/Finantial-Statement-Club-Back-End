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

      if (!tadawalCode || !year || !section || !category || !language) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

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
            ProfitLoss: {},
            CashFlow: {},
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

          // Update the BalanceSheet data in the document
          matchedDocument.formData[section].table.BalanceSheet =
            balanceSheetData;

          // Save the updated document with error handling
          try {
            await matchedDocument.save();

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
        } else if (category === "CashFlow" && data) {
          console.log("this is the cashflow object : English Back-end ", data);

        const CashFlowData = {
  date1En: data.date1,
  date2En: data.date2,

  sectionOne: {
    sectionOneLabelsEn: ensureArray(data.sectionOne?.sectionOneLabelsEn),
    sectionOneNotesEn: ensureArray(data.sectionOne?.sectionOneNotesEn),
    sectionOneItemsEn: ensureArray(data.sectionOne?.sectionOneItemsEn),
    sectionOneItemsDate2En: ensureArray(data.sectionOne?.sectionOneItemsDate2En),
    sectionOneTotalLabel: data.sectionOne?.sectionOneTotalLabel || "",
    TotalsectionOneItemsEn: safeParseFloat(data.sectionOne?.TotalsectionOneItemsEn),
    TotalsectionOneItemsDate2En: safeParseFloat(data.sectionOne?.TotalsectionOneItemsDate2En),
  },

  sectionTwo: {
    sectionTwoLabelsEn: ensureArray(data.sectionTwo?.sectionTwoLabelsEn),
    sectionTwoNotesEn: ensureArray(data.sectionTwo?.sectionTwoNotesEn),
    sectionTwoItemsEn: ensureArray(data.sectionTwo?.sectionTwoItemsEn),
    sectionTwoItemsDate2En: ensureArray(data.sectionTwo?.sectionTwoItemsDate2En),
    sectionTwoTotalLabel: data.sectionTwo?.sectionTwoTotalLabel || "",
    TotalsectionTwoItemsEn: safeParseFloat(data.sectionTwo?.TotalsectionTwoItemsEn),
    TotalsectionTwoItemsDate2En: safeParseFloat(data.sectionTwo?.TotalsectionTwoItemsDate2En),
  },

  sectionThree: {
    sectionThreeLabelsEn: ensureArray(data.sectionThree?.sectionThreeLabelsEn),
    sectionThreeNotesEn: ensureArray(data.sectionThree?.sectionThreeNotesEn),
    sectionThreeItemsEn: ensureArray(data.sectionThree?.sectionThreeItemsEn),
    sectionThreeItemsDate2En: ensureArray(data.sectionThree?.sectionThreeItemsDate2En),
    sectionThreeTotalLabel: data.sectionThree?.sectionThreeTotalLabel || "",
    TotalsectionThreeItemsEn: safeParseFloat(data.sectionThree?.TotalsectionThreeItemsEn),
    TotalsectionThreeItemsDate2En: safeParseFloat(data.sectionThree?.TotalsectionThreeItemsDate2En),
  },

  sectionFour: {
    sectionFourLabelsEn: ensureArray(data.sectionFour?.sectionFourLabelsEn),
    sectionFourNotesEn: ensureArray(data.sectionFour?.sectionFourNotesEn),
    sectionFourItemsEn: ensureArray(data.sectionFour?.sectionFourItemsEn),
    sectionFourItemsDate2En: ensureArray(data.sectionFour?.sectionFourItemsDate2En),
    sectionFourTotalLabel: data.sectionFour?.sectionFourTotalLabel || "",
    TotalsectionFourItemsEn: safeParseFloat(data.sectionFour?.TotalsectionFourItemsEn),
    TotalsectionFourItemsDate2En: safeParseFloat(data.sectionFour?.TotalsectionFourItemsDate2En),
  },


  sectionFourAttributeOne: {
  sectionFourAttribute: data.sectionAttributeOne?.sectionFourAttribute,
  sectionFourAttributeLabelsEn: ensureArray(data.sectionAttributeOne?.sectionFourAttributeLabelsEn),
  sectionFourAttributeItemsEn: ensureArray(data.sectionAttributeOne?.sectionFourAttributeItemsEn),
  sectionFourAttributeItemsDate2En: ensureArray(data.sectionAttributeOne?.sectionFourAttributeItemsDate2En) ,
  TotalsectionFourAttributeItemsEn: safeParseFloat(data.sectionAttributeOne?.TotalsectionFourAttributeItemsEn),
  TotalsectionFourAttributeItemsDate2En: safeParseFloat(data.sectionAttributeOne?.TotalsectionFourAttributeItemsDate2En),
},
sectionOtherComprehensiveIncome: {
  sectionFourOtherComprehensiveIncome: data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncome || "",
  sectionFourOtherComprehensiveIncomeSubheading: data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheading || "",
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray(data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
  sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray(data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingNotesEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray(data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray(data.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
  sectionFourOtherTotalComprehensiveIncome: data.sectionOtherComprehensiveIncome?.sectionFourOtherTotalComprehensiveIncome || "",
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn: safeParseFloat(data.sectionOtherComprehensiveIncome?.TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn),
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: safeParseFloat(data.sectionOtherComprehensiveIncome?.TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
},
sectionAttributeTwo: {
  sectionFourAttribute2: data.sectionAttributeTwo?.sectionFourAttribute2 || "",
  sectionFourAttribute2LabelsEn: ensureArray(data.sectionAttributeTwo?.sectionFourAttribute2LabelsEn),
 
  sectionFourAttribute2ItemsEn: ensureArray(data.sectionAttributeTwo?.sectionFourAttribute2ItemsEn),
  sectionFourAttribute2ItemsDate2En: ensureArray(data.sectionAttributeTwo?.sectionFourAttribute2ItemsDate2En),

  TotalsectionFourAttribute2ItemsEn: safeParseFloat(data.sectionAttributeTwo?.TotalsectionFourAttribute2ItemsEn),
  TotalsectionFourAttribute2ItemsDate2En: safeParseFloat(data.sectionAttributeTwo?.TotalsectionFourAttribute2ItemsDate2En),
},


  sectionFive: {
    sectionFiveLabelsEn: ensureArray(data.sectionFive?.sectionFiveLabelsEn),
    sectionFiveNotesEn: ensureArray(data.sectionFive?.sectionFiveNotesEn),
    sectionFiveItemsEn: ensureArray(data.sectionFive?.sectionFiveItemsEn),
    sectionFiveItemsDate2En: ensureArray(data.sectionFive?.sectionFiveItemsDate2En),
    sectionFiveTotalLabel: data.sectionFive?.sectionFiveTotalLabel || "",
    TotalsectionFiveItemsEn: safeParseFloat(data.sectionFive?.TotalsectionFiveItemsEn),
    TotalsectionFiveItemsDate2En: safeParseFloat(data.sectionFive?.TotalsectionFiveItemsDate2En),
  },

  sectionSix: {
    sectionSixLabelsEn: ensureArray(data.sectionSix?.sectionSixLabelsEn),
    sectionSixNotesEn: ensureArray(data.sectionSix?.sectionSixNotesEn),
    sectionSixItemsEn: ensureArray(data.sectionSix?.sectionSixItemsEn),
    sectionSixItemsDate2En: ensureArray(data.sectionSix?.sectionSixItemsDate2En),
    sectionSixTotalLabel: data.sectionSix?.sectionSixTotalLabel || "",
    TotalsectionSixItemsEn: safeParseFloat(data.sectionSix?.TotalsectionSixItemsEn),
    TotalsectionSixItemsDate2En: safeParseFloat(data.sectionSix?.TotalsectionSixItemsDate2En),
  }
};


          // Assign the data
          matchedDocument.formData[section].table.CashFlow = CashFlowData;

          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "Cash Flow data English saved successfully.",
              Tabledata: matchedDocument.formData[section].table.CashFlow,
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
            ProfitLoss: {},
            CashFlow: {},
          };
        }
        // Process data for BalanceSheet if that's the selected table type
        if (category === "BalanceSheet" && data) {
          console.log(
            "this I Exprected balance sheet data of the data : ",
            data
          );

          // Create the BalanceSheet object according to schema structure
          const balanceSheetData = {
            assets: {
              sassets: data.qassets?.qsassets || "",
              current: {
                scurrentAssets: data.qassets?.qcurrent?.qscurrentAssets || "",
                currentLabels: ensureArray(
                  data.qassets?.qcurrent?.qcurrentLabelsAr
                ), // Fixed: was currentLabelsAr
                CurrentAssetsNotes: ensureArray(
                  data.qassets?.qcurrent?.qCurrentAssetsNotes
                ),
                items: ensureArray(data.qassets?.qcurrent?.qitems),
                itemsDate2: ensureArray(data.qassets?.qcurrent?.qitemsDate2),
                subItems: ensureArray(data.qassets?.qcurrent?.qsubItems),
                currentSubLabels: ensureArray(
                  data.qassets?.qcurrent?.qcurrentSubLabelsAr
                ), // Fixed: was currentSubLabelsAr
                subItemsDate2: ensureArray(
                  data.qassets?.qcurrent?.qsubItemsDate2
                ),
                firstTotal: safeParseFloat(data.qassets?.qcurrent?.qfirstTotal),
                firstTotalDate2: safeParseFloat(
                  data.qassets?.qcurrent?.qfirstTotalDate2
                ),
                secondTotal: safeParseFloat(
                  data.qassets?.qcurrent?.qsecondTotal
                ),
                secondTotalDate2: safeParseFloat(
                  data.qassets?.qcurrent?.qsecondTotalDate2
                ),
                sfirtsTotalCurrentAssets:
                  data.qassets?.qcurrent?.qsfirtsTotalCurrentAssets || "",
                stotalCurrentAssets:
                  data.qassets?.qcurrent?.qstotalCurrentAssets || "",
              },
              nonCurrent: {
                snonCurrentAssets:
                  data.qassets?.qnonCurrent?.qsnonCurrentAssets || "",
                nonCurrentLabels: ensureArray(
                  data.qassets?.qnonCurrent?.qnonCurrentLabelsAr
                ), // Fixed: was nonCurrentLabelsAr
                nonCurrentNotes: ensureArray(
                  data.qassets?.qnonCurrent?.qnonCurrentNotes
                ),
                items: ensureArray(data.qassets?.qnonCurrent?.qitems),
                itemsDate2: ensureArray(data.qassets?.qnonCurrent?.qitemsDate2),
                subItems: ensureArray(data.qassets?.qnonCurrent?.qsubItems),
                subItemsDate2: ensureArray(
                  data.qassets?.qnonCurrent?.qsubItemsDate2
                ),
                nonCurrentSubLabels: ensureArray(
                  data.qassets?.qnonCurrent?.qnonCurrentSubLabelsAr
                ), // Fixed: was nonCurrentSubLabelsAr
                firstTotal: safeParseFloat(
                  data.qassets?.qnonCurrent?.qfirstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.qassets?.qnonCurrent?.qfirstTotalDate2
                ),
                secondTotal: safeParseFloat(
                  data.qassets?.qnonCurrent?.qsecondTotal
                ),
                secondTotalDate2: safeParseFloat(
                  data.qassets?.qnonCurrent?.qsecondTotalDate2
                ),
                sfirtsTotalnonCurrentAssets:
                  data.qassets?.qnonCurrent?.qsfirtsTotalnonCurrentAssets || "",
                stotalNonCurrentAssets:
                  data.qassets?.qnonCurrent?.qstotalNonCurrentAssets || "",
              },
              stotalAssets: data.qassets?.qstotalAssets || "", // Added missing field
              totalAssets: safeParseFloat(data.qassets?.qtotalAssets),
              totalAssetsDate2: safeParseFloat(data.qassets?.qtotalAssetsDate2),
            },

            // Added missing data fields
            data1En: data.qdata1En || null,
            data2En: data.qdata2En || null,

            equity: {
              sShareholdersEquity: data.qequity?.qsShareholdersEquity || "",
              equityLabels: ensureArray(data.qequity?.qequityLabelsAr), // Fixed: was equityLabelsAr
              equityItemsNotes: ensureArray(data.qequity?.qequityItemsNotes),
              items: ensureArray(data.qequity?.qitems),
              itemsDate2: ensureArray(data.qequity?.qitemsDate2),
              equitySubLabels: ensureArray(data.qequity?.qequitySubLabelsAr), // Fixed: was equitySubLabelsAr
              subItems: ensureArray(data.qequity?.qsubItems),
              subItemsDate2: ensureArray(data.qequity?.qsubItemsDate2),
              firstTotal: safeParseFloat(data.qequity?.qfirstTotal),
              firstTotalDate2: safeParseFloat(data.qequity?.qfirstTotalDate2),
              sfirtsTotalShareholdersEquity:
                data.qequity?.qsfirtsTotalShareholdersEquity || "",
              stotalShareholdersEquity:
                data.qequity?.qstotalShareholdersEquity || "",
              totalEquity: safeParseFloat(data.qequity?.qtotalEquity),
              totalEquityDate2: safeParseFloat(data.qequity?.qtotalEquityDate2),
            },

            liabilities: {
              liabilities: data.qliabilities?.qliabilities || "",

              current: {
                scurrentliabilities:
                  data.qliabilities?.qcurrent?.qscurrentliabilities || "",
                currentLiabilitiesLabels: ensureArray(
                  data.qliabilities?.qcurrent?.qcurrentLiabilitiesLabelsAr
                ), // Fixed: was currentLiabilitiesLabelsAr
                currentLiabilitiesSubLabels: ensureArray(
                  data.qliabilities?.qcurrent?.qcurrentSubLiabilitiesLabelsAr
                ), // Fixed: was currentSubLiabilitiesLabelsAr
                items: ensureArray(data.qliabilities?.qcurrent?.qitems),
                itemsDate2: ensureArray(
                  data.qliabilities?.qcurrent?.qitemsDate2
                ),
                subItems: ensureArray(data.qliabilities?.qcurrent?.qsubItems),
                subItemsDate2: ensureArray(
                  data.qliabilities?.qcurrent?.qsubItemsDate2
                ),
                currentLiabilitiesNotes: ensureArray(
                  data.qliabilities?.qcurrent?.qcurrentLiabilitiesNotes
                ),
                firstTotal: safeParseFloat(
                  data.qliabilities?.qcurrent?.qfirstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.qliabilities?.qcurrent?.qfirstTotalDate2
                ),
                total: safeParseFloat(data.qliabilities?.qcurrent?.qtotal),
                totalDate2: safeParseFloat(
                  data.qliabilities?.qcurrent?.qtotalDate2
                ),
                sfirtsTotalcurrentLiabilities:
                  data.qliabilities?.qcurrent?.qsfirtsTotalcurrentLiabilities ||
                  "",
                stotalcurrentliabilities:
                  data.qliabilities?.qcurrent?.qstotalcurrentliabilities || "",
              },

              nonCurrent: {
                sNoncurrentliabilities:
                  data.qliabilities?.qnonCurrent?.qsNoncurrentliabilities || "",
                NonCurrentLiabilitiesLabels: ensureArray(
                  data.qliabilities?.qnonCurrent?.qnonCurrentLiabilitiesLabelsAr
                ), // Fixed: was NonCurrentLiabilitiesLabelsAr
                NonCurrentLiabilitiesSubLabels: ensureArray(
                  data.qliabilities?.qnonCurrent
                    ?.qnonCurrentSubLiabilitiesLabelsAr
                ), // Fixed: was NonCurrentLiabilitiesSubLabelsAr
                nonCurrentLiabilitiesNotes: ensureArray(
                  data.qliabilities?.qnonCurrent?.qnonCurrentLiabilitiesNotes
                ),
                items: ensureArray(data.qliabilities?.qnonCurrent?.qitems),
                itemsDate2: ensureArray(
                  data.qliabilities?.qnonCurrent?.qitemsDate2
                ),
                subItems: ensureArray(
                  data.qliabilities?.qnonCurrent?.qsubItems
                ),
                subItemsDate2: ensureArray(
                  data.qliabilities?.qnonCurrent?.qsubItemsDate2
                ),
                firstTotal: safeParseFloat(
                  data.qliabilities?.qnonCurrent?.qfirstTotal
                ),
                firstTotalDate2: safeParseFloat(
                  data.qliabilities?.qnonCurrent?.qfirstTotalDate2
                ),
                total: safeParseFloat(data.qliabilities?.qnonCurrent?.qtotal),
                totalDate2: safeParseFloat(
                  data.qliabilities?.qnonCurrent?.qtotalDate2
                ),
                sfirtsTotalNoncurrentLiabilities:
                  data.qliabilities?.qnonCurrent
                    ?.qsfirtsTotalNoncurrentLiabilities || "",
                stotalNoncurrentliabilities:
                  data.qliabilities?.qnonCurrent
                    ?.qstotalNoncurrentliabilities || "",
              },

              stotalliabilities: data.qliabilities?.qstotalliabilities || "",
              totalLiabilities: safeParseFloat(
                data.qliabilities?.qtotalLiabilities
              ),
              totalLiabilitiesDate2: safeParseFloat(
                data.qliabilities?.qtotalLiabilitiesDate2
              ),
            },

            sShareholdersEquityandliabilitiess:
              data?.qShareholdersEquityandliabilitiess || "",
            stotalEquityAndLiabilities: data?.qstotalEquityAndLiabilities || "",
            ItotalEquityAndLiabilities: safeParseFloat(
              data?.qItotalEquityAndLiabilities
            ),
            ItotalEquityAndLiabilitiesDate2: safeParseFloat(
              data?.qItotalEquityAndLiabilitiesDate2
            ),
          };

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
        } else if(category === "CashFlow" && data){

           console.log("this is the cashflow object Arabic : back-end ", data);

         const CashFlowDataAr = {
  date1Ar: data.qdate1,
  date2Ar: data.qdate2,

  sectionOne: {
    sectionOneLabelsEn: ensureArray(data.sectionOne?.qsectionOneLabelsEn),
    sectionOneNotesEn: ensureArray(data.sectionOne?.qsectionOneNotesEn),
    sectionOneItemsEn: ensureArray(data.sectionOne?.qsectionOneItemsEn),
    sectionOneItemsDate2En: ensureArray(data.sectionOne?.qsectionOneItemsDate2En),
    sectionOneTotalLabel: data.sectionOne?.qsectionOneTotalLabel || "",
    TotalsectionOneItemsEn: safeParseFloat(data.sectionOne?.qTotalsectionOneItemsEn),
    TotalsectionOneItemsDate2En: safeParseFloat(data.sectionOne?.qTotalsectionOneItemsDate2En),
  },

  sectionTwo: {
    sectionTwoLabelsEn: ensureArray(data.sectionTwo?.qsectionTwoLabelsEn),
    sectionTwoNotesEn: ensureArray(data.sectionTwo?.qsectionTwoNotesEn),
    sectionTwoItemsEn: ensureArray(data.sectionTwo?.qsectionTwoItemsEn),
    sectionTwoItemsDate2En: ensureArray(data.sectionTwo?.qsectionTwoItemsDate2En),
    sectionTwoTotalLabel: data.sectionTwo?.qsectionTwoTotalLabel || "",
    TotalsectionTwoItemsEn: safeParseFloat(data.sectionTwo?.qTotalsectionTwoItemsEn),
    TotalsectionTwoItemsDate2En: safeParseFloat(data.sectionTwo?.qTotalsectionTwoItemsDate2En),
  },

  sectionThree: {
    sectionThreeLabelsEn: ensureArray(data.sectionThree?.qsectionThreeLabelsEn),
    sectionThreeNotesEn: ensureArray(data.sectionThree?.qsectionThreeNotesEn),
    sectionThreeItemsEn: ensureArray(data.sectionThree?.qsectionThreeItemsEn),
    sectionThreeItemsDate2En: ensureArray(data.sectionThree?.qsectionThreeItemsDate2En),
    sectionThreeTotalLabel: data.sectionThree?.qsectionThreeTotalLabel || "",
    TotalsectionThreeItemsEn: safeParseFloat(data.sectionThree?.qTotalsectionThreeItemsEn),
    TotalsectionThreeItemsDate2En: safeParseFloat(data.sectionThree?.qTotalsectionThreeItemsDate2En),
  },

  sectionFour: {
    sectionFourLabelsEn: ensureArray(data.sectionFour?.qsectionFourLabelsEn),
    sectionFourNotesEn: ensureArray(data.sectionFour?.qsectionFourNotesEn),
    sectionFourItemsEn: ensureArray(data.sectionFour?.qsectionFourItemsEn),
    sectionFourItemsDate2En: ensureArray(data.sectionFour?.qsectionFourItemsDate2En),
    sectionFourTotalLabel: data.sectionFour?.qsectionFourTotalLabel || "",
    TotalsectionFourItemsEn: safeParseFloat(data.sectionFour?.qTotalsectionFourItemsEn),
    TotalsectionFourItemsDate2En: safeParseFloat(data.sectionFour?.qTotalsectionFourItemsDate2En),
  },

  sectionFourAttributeOne: {
  sectionFourAttribute: data.sectionAttributeOne?.qsectionFourAttribute,
  sectionFourAttributeLabelsEn: ensureArray(data.sectionAttributeOne?.qsectionFourAttributeLabelsEn),
  sectionFourAttributeItemsEn: ensureArray(data.sectionAttributeOne?.qsectionFourAttributeItemsEn),
  sectionFourAttributeItemsDate2En: ensureArray(data.sectionAttributeOne?.qsectionFourAttributeItemsDate2En) ,
  TotalsectionFourAttributeItemsEn: safeParseFloat(data.sectionAttributeOne?.qTotalsectionFourAttributeItemsEn),
  TotalsectionFourAttributeItemsDate2En: safeParseFloat(data.sectionAttributeOne?.qTotalsectionFourAttributeItemsDate2En),
},
sectionOtherComprehensiveIncome: {
  sectionFourOtherComprehensiveIncome: data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncome || "",
  sectionFourOtherComprehensiveIncomeSubheading: data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheading || "",
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray(data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
  sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray(data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingNotesEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray(data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingItemsEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray(data.sectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
  sectionFourOtherTotalComprehensiveIncome: data.sectionOtherComprehensiveIncome?.qsectionFourOtherTotalComprehensiveIncome || "",
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn: safeParseFloat(data.sectionOtherComprehensiveIncome?.qTotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn),
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: safeParseFloat(data.sectionOtherComprehensiveIncome?.qTotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
},
sectionAttributeTwo: {
  sectionFourAttribute2: data.sectionAttributeTwo?.qsectionFourAttribute2 || "",
  sectionFourAttribute2LabelsEn: ensureArray(data.sectionAttributeTwo?.qsectionFourAttribute2LabelsEn),
 
  sectionFourAttribute2ItemsEn: ensureArray(data.sectionAttributeTwo?.qsectionFourAttribute2ItemsEn),
  sectionFourAttribute2ItemsDate2En: ensureArray(data.sectionAttributeTwo?.qsectionFourAttribute2ItemsDate2En),

  TotalsectionFourAttribute2ItemsEn: safeParseFloat(data.sectionAttributeTwo?.qTotalsectionFourAttribute2ItemsEn),
  TotalsectionFourAttribute2ItemsDate2En: safeParseFloat(data.sectionAttributeTwo?.qTotalsectionFourAttribute2ItemsDate2En),
},


  sectionFive: {
    sectionFiveLabelsEn: ensureArray(data.sectionFive?.qsectionFiveLabelsEn),
    sectionFiveNotesEn: ensureArray(data.sectionFive?.qsectionFiveNotesEn),
    sectionFiveItemsEn: ensureArray(data.sectionFive?.qsectionFiveItemsEn),
    sectionFiveItemsDate2En: ensureArray(data.sectionFive?.qsectionFiveItemsDate2En),
    sectionFiveTotalLabel: data.sectionFive?.qsectionFiveTotalLabel || "",
    TotalsectionFiveItemsEn: safeParseFloat(data.sectionFive?.qTotalsectionFiveItemsEn),
    TotalsectionFiveItemsDate2En: safeParseFloat(data.sectionFive?.qTotalsectionFiveItemsDate2En),
  },

  sectionSix: {
    sectionSixLabelsEn: ensureArray(data.sectionSix?.qsectionSixLabelsEn),
    sectionSixNotesEn: ensureArray(data.sectionSix?.qsectionSixNotesEn),
    sectionSixItemsEn: ensureArray(data.sectionSix?.qsectionSixItemsEn),
    sectionSixItemsDate2En: ensureArray(data.sectionSix?.qsectionSixItemsDate2En),
    sectionSixTotalLabel: data.sectionSix?.qsectionSixTotalLabel || "",
    TotalsectionSixItemsEn: safeParseFloat(data.sectionSix?.qTotalsectionSixItemsEn),
    TotalsectionSixItemsDate2En: safeParseFloat(data.sectionSix?.qTotalsectionSixItemsDate2En),
  }
};


          // Assign the data
          matchedDocument.formData[section].table.CashFlow = CashFlowDataAr;

          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "Cash Flow data Arabic saved successfully.",
              Tabledata: matchedDocument.formData[section].table.CashFlow,
            });
          } catch (saveError) {
            console.error("Error saving document:", saveError);
            return res.status(500).json({
              success: false,
              message: "Error saving document",
              error: saveError.message,
            });
          }

        }else {
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
