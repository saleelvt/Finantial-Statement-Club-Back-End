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
                secondTotalDate2: safeParseFloat( data.assets?.current?.secondTotalDate2 ),
                sfirtsTotalCurrentAssets:
                  data.assets?.current?.sfirtsTotalCurrentAssets || "",
                stotalCurrentAssets: data.assets?.current?.stotalCurrentAssets || "", },
              nonCurrent: { snonCurrentAssets: data.assets?.nonCurrent?.snonCurrentAssets || "",
                 nonCurrentLabels: ensureArray( data.assets?.nonCurrent?.nonCurrentLabelsAr
                ),
                items: ensureArray(data.assets?.nonCurrent?.items),
                itemsDate2: ensureArray(data.assets?.nonCurrent?.itemsDate2),
                nonCurrentSubLabels: ensureArray( data.assets?.nonCurrent?.nonCurrentSubLabelsAr
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
              sfirtsTotalShareholdersEquity: data.equity?.sfirtsTotalShareholdersEquity || "",
              stotalShareholdersEquity:data.equity?.stotalShareholdersEquity || "",
              totalEquity: safeParseFloat(data.equity?.totalEquity),
              totalEquityDate2: safeParseFloat(data.equity?.totalEquityDate2),
              equityItemsNotes: ensureArray(data.equity?.equityItemsNotes),
            },
            // Liabilities section
            liabilities: {
              liabilities: data.liabilities?.liabilities || "",
              current: {
                scurrentliabilities:data.liabilities?.current?.scurrentliabilities || "",
                currentLiabilitiesLabels: ensureArray(data.liabilities?.current?.currentLiabilitiesLabelsAr ),
                currentLiabilitiesSubLabels: ensureArray(data.liabilities?.current?.currentSubLiabilitiesLabelsAr),
                items: ensureArray(data.liabilities?.current?.items),
                itemsDate2: ensureArray(data.liabilities?.current?.itemsDate2),
                subItems: ensureArray(data.liabilities?.current?.subItems),
                subItemsDate2: ensureArray( data.liabilities?.current?.subItemsDate2
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
        } else if (category === "ProfitLoss" && data) { 


        const ProfitLossData = {
        date1En: data.date1,
       date2En: data.date2,

  sectionOne: {
     sectionOneFirstLabelEn: data.sectionOne?.sectionOneFirstLabelEn || "",
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

  sectionFourSub: {
     sectionFourSubFirstLabelEn: data.sectionFourSub?.sectionFourSubFirstLabelEn || "",
    sectionFourSubLabelsEn: ensureArray(data.sectionFourSub?.sectionFourSubLabelsEn),
    sectionFourSubNotesEn: ensureArray(data.sectionFourSub?.sectionFourSubNotesEn),
    sectionFourSubItemsEn: ensureArray(data.sectionFourSub?.sectionFourSubItemsEn),
    sectionFourSubItemsDate2En: ensureArray(data.sectionFourSub?.sectionFourSubItemsDate2En),
    sectionFourSubTotalLabel: data.sectionFourSub?.sectionFourSubTotalLabel || "",
    TotalsectionFourSubItemsEn: safeParseFloat(data.sectionFourSub?.TotalsectionFourSubItemsEn),
    TotalsectionFourSubItemsDate2En: safeParseFloat(data.sectionFourSub?.TotalsectionFourSubItemsDate2En),
  },  

 
  sectionAttributeOne: {
    sectionFourAttribute: data?.sectionAttributeOne?.sectionFourAttribute || "",
    sectionFourAttributeLabelsEn: ensureArray(data?.sectionAttributeOne?.sectionFourAttributeLabelsEn),
    sectionFourAttributeItemsEn: ensureArray(data?.sectionAttributeOne?.sectionFourAttributeItemsEn),
    sectionFourAttributeItemsDate2En: ensureArray(data?.sectionAttributeOne?.sectionFourAttributeItemsDate2En),
    TotalsectionFourAttributeItemsEn: safeParseFloat(data?.sectionAttributeOne?.TotalsectionFourAttributeItemsEn),
    TotalsectionFourAttributeItemsDate2En: safeParseFloat(data?.sectionAttributeOne?.TotalsectionFourAttributeItemsDate2En),
  },

  sectionAttributeTwo: {
    sectionFourAttribute2: data?.sectionAttributeTwo?.sectionFourAttribute2 || "",
    sectionFourAttribute2LabelsEn: ensureArray(data?.sectionAttributeTwo?.sectionFourAttribute2LabelsEn),
    sectionFourAttribute2ItemsEn: ensureArray(data?.sectionAttributeTwo?.sectionFourAttribute2ItemsEn),
    sectionFourAttribute2ItemsDate2En: ensureArray(data?.sectionAttributeTwo?.sectionFourAttribute2ItemsDate2En),
    TotalsectionFourAttribute2ItemsEn: safeParseFloat(data?.sectionAttributeTwo?.TotalsectionFourAttribute2ItemsEn),
    TotalsectionFourAttribute2ItemsDate2En: safeParseFloat(data?.sectionAttributeTwo?.TotalsectionFourAttribute2ItemsDate2En),
  },

  sectionOtherComprehensiveIncome: {
    sectionFourOtherComprehensiveIncome: data?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncome || "",
    sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray(data?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
    sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray(data?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingNotesEn),
    sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray(data?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsEn),
    sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray(data?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
  },

   Table2: {
  dateTwo1En: data.Table2?.dateTwo1En,
  dateTwo2En: data.Table2?.dateTwo2En,
  
  sectionOneTable2: {
    sectionLastLabel: data.Table2?.sectionOneTable2?.sectionLastLabel || "",
    TotalsectionFourSubItemsEn: safeParseFloat(data.Table2?.sectionOneTable2?.TotalsectionFourSubItemsEn),
    TotalsectionFourSubItemsDate2En: safeParseFloat(data.Table2?.sectionOneTable2?.TotalsectionFourSubItemsDate2En),
    sectionSevenLastLabel: data.Table2?.sectionOneTable2?.sectionSevenLastLabel || "",
    sectionSevenSubheading: data.Table2?.sectionOneTable2?.sectionSevenSubheading || "",
    sectionLastLabelsEn: ensureArray(data.Table2?.sectionOneTable2?.sectionLastLabelsEn),
    sectionLastNotesEn: ensureArray(data.Table2?.sectionOneTable2?.sectionLastNotesEn),
    sectionLastItemsEn: ensureArray(data.Table2?.sectionOneTable2?.sectionLastItemsEn),
    sectionLastItemsDate2En: ensureArray(data.Table2?.sectionOneTable2?.sectionLastItemsDate2En),
    sectionLastTotalLabelEn: data.Table2?.sectionOneTable2?.sectionLastTotalLabelEn || "",
    TotalSectionLastLabelItemsEn: safeParseFloat(data.Table2?.sectionOneTable2?.TotalSectionLastLabelItemsEn),
    TotalSectionLastItemsDate2En: safeParseFloat(data.Table2?.sectionOneTable2?.TotalSectionLastItemsDate2En),
  },

  sectionTwoTable2: {
    sectionSevenSubheading2: data.Table2?.sectionTwoTable2?.sectionSevenSubheading2 || "",
    sectionLastLabelsEn2: ensureArray(data.Table2?.sectionTwoTable2?.sectionLastLabelsEn2),
    sectionLastNotesEn2: ensureArray(data.Table2?.sectionTwoTable2?.sectionLastNotesEn2),
    sectionLastItemsEn2: ensureArray(data.Table2?.sectionTwoTable2?.sectionLastItemsEn2),
    sectionLastItemsDate2En2: ensureArray(data.Table2?.sectionTwoTable2?.sectionLastItemsDate2En2),
    sectionLastTotalLabelEn2: data.Table2?.sectionTwoTable2?.sectionLastTotalLabelEn2 || "",
    TotalSectionLastLabelItemsEn2: safeParseFloat(data.Table2?.sectionTwoTable2?.TotalSectionLastLabelItemsEn2),
    TotalSectionLastItemsDate2En2: safeParseFloat(data.Table2?.sectionTwoTable2?.TotalSectionLastItemsDate2En2),
    
    totalOtherComp: {
      SectionSevenSecondLastLabel2: data.Table2?.sectionTwoTable2?.totalOtherComp?.SectionSevenSecondLastLabel2 || "",
      TotalsectionSevenSecondLastItemEn: safeParseFloat(data.Table2?.sectionTwoTable2?.totalOtherComp?.TotalsectionSevenSecondLastItemEn),
      TotalsectionSevenSecondLastItemsDate2En: safeParseFloat(data.Table2?.sectionTwoTable2?.totalOtherComp?.TotalsectionSevenSecondLastItemsDate2En),
    },
    
    totalComprehensiveLoss: {
      SectionSevenLastLabel2: data.Table2?.sectionTwoTable2?.totalComprehensiveLoss?.SectionSevenLastLabel2 || "",
      TotalsectionSevenLastItemEn: safeParseFloat(data.Table2?.sectionTwoTable2?.totalComprehensiveLoss?.TotalsectionSevenLastItemEn),
      TotalsectionSevenLastItemsDate2En: safeParseFloat(data.Table2?.sectionTwoTable2?.totalComprehensiveLoss?.TotalsectionSevenLastItemsDate2En),
    },
  },

  sectionAttributeOneTable2: {
    sectionFourAttributeTable2: data.Table2?.sectionAttributeOneTable2?.sectionFourAttributeTable2 || "",
    sectionFourAttributeLabelsEnTable2: ensureArray(data.Table2?.sectionAttributeOneTable2?.sectionFourAttributeLabelsEnTable2),
    sectionFourAttributeItemsEnTable2: ensureArray(data.Table2?.sectionAttributeOneTable2?.sectionFourAttributeItemsEnTable2),
    sectionFourAttributeItemsDate2EnTable2: ensureArray(data.Table2?.sectionAttributeOneTable2?.sectionFourAttributeItemsDate2EnTable2),
    TotalsectionFourAttributeItemsEnTable2: safeParseFloat(data.Table2?.sectionAttributeOneTable2?.TotalsectionFourAttributeItemsEnTable2),
    TotalsectionFourAttributeItemsDate2EnTable2: safeParseFloat(data.Table2?.sectionAttributeOneTable2?.TotalsectionFourAttributeItemsDate2EnTable2),
  },

  sectionAttributeTwoTable2: {
    sectionFourAttribute2Table2: data.Table2?.sectionAttributeTwoTable2?.sectionFourAttribute2Table2 || "",
    sectionFourAttribute2LabelsEnTable2: ensureArray(data.Table2?.sectionAttributeTwoTable2?.sectionFourAttribute2LabelsEnTable2),
    sectionFourAttribute2ItemsEnTable2: ensureArray(data.Table2?.sectionAttributeTwoTable2?.sectionFourAttribute2ItemsEnTable2),
    sectionFourAttribute2ItemsDate2EnTable2: ensureArray(data.Table2?.sectionAttributeTwoTable2?.sectionFourAttribute2ItemsDate2EnTable2),
    TotalsectionFourAttribute2ItemsEnTable2: safeParseFloat(data.Table2?.sectionAttributeTwoTable2?.TotalsectionFourAttribute2ItemsEnTable2),
    TotalsectionFourAttribute2ItemsDate2EnTable2: safeParseFloat(data.Table2?.sectionAttributeTwoTable2?.TotalsectionFourAttribute2ItemsDate2EnTable2),
  },

  sectionOtherComprehensiveIncomeTable2: {
    sectionFourOtherComprehensiveIncomeTable2: data.Table2?.sectionOtherComprehensiveIncomeTable2?.sectionFourOtherComprehensiveIncomeTable2 || "",
    sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: ensureArray(data.Table2?.sectionOtherComprehensiveIncomeTable2?.sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2),
    sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: ensureArray(data.Table2?.sectionOtherComprehensiveIncomeTable2?.sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2),
    sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: ensureArray(data.Table2?.sectionOtherComprehensiveIncomeTable2?.sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2),
    sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: ensureArray(data.Table2?.sectionOtherComprehensiveIncomeTable2?.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2),
  },
},


};






          // Assign the data
          matchedDocument.formData[section].table.ProfitLoss = ProfitLossData;

          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "Profit Loss data data English saved successfully.",
              Tabledata: matchedDocument.formData[section].table.ProfitLoss,
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

const CashFlowData = {
  // Main dates
  date1En: data.date1,
  date2En: data.date2,

  // Section One - Operating activities
  sectionOne: {
    sectionOneFirstLabelEn: data.sectionOne?.sectionOneFirstLabelEn || "",
    sectionOneSecondLabelEn: data.sectionOne?.sectionOneSecondLabelEn || "",
    sectionOneLabelsEn: ensureArray(data.sectionOne?.sectionOneLabelsEn),
    sectionOneNotesEn: ensureArray(data.sectionOne?.sectionOneNotesEn),
    sectionOneItemsEn: ensureArray(data.sectionOne?.sectionOneItemsEn),
    sectionOneItemsDate2En: ensureArray(data.sectionOne?.sectionOneItemsDate2En),
  },

  // Section Two - Adjustments for
  sectionTwo: {
    sectionTwoFirstLabel: data.sectionTwo?.sectionTwoFirstLabel || "",
    sectionTwoLabelsEn: ensureArray(data.sectionTwo?.sectionTwoLabelsEn),
    sectionTwoNotesEn: ensureArray(data.sectionTwo?.sectionTwoNotesEn),
    sectionTwoItemsEn: ensureArray(data.sectionTwo?.sectionTwoItemsEn),
    sectionTwoItemsDate2En: ensureArray(data.sectionTwo?.sectionTwoItemsDate2En),
    sectionTwoTotalLabel: data.sectionTwo?.sectionTwoTotalLabel || "",
    sectionTwoTotalNote: data.sectionTwo?.sectionTwoTotalNote || "",
    TotalsectionTwoItemsEn: safeParseFloat(data.sectionTwo?.TotalsectionTwoItemsEn),
    TotalsectionTwoItemsDate2En: safeParseFloat(data.sectionTwo?.TotalsectionTwoItemsDate2En),
  },

  // Section Three - Working capital adjustments
  sectionThree: {
    sectionThreeFirstLabel: data.sectionThree?.sectionThreeFirstLabel || "",
    sectionThreeLabelsEn: ensureArray(data.sectionThree?.sectionThreeLabelsEn),
    sectionThreeNotesEn: ensureArray(data.sectionThree?.sectionThreeNotesEn),
    sectionThreeItemsEn: ensureArray(data.sectionThree?.sectionThreeItemsEn),
    sectionThreeItemsDate2En: ensureArray(data.sectionThree?.sectionThreeItemsDate2En),
    sectionThreeTotalLabel: data.sectionThree?.sectionThreeTotalLabel || "",
    sectionThreeTotalNote: data.sectionThree?.sectionThreeTotalNote || "",
    TotalsectionThreeItemsEn: safeParseFloat(data.sectionThree?.TotalsectionThreeItemsEn),
    TotalsectionThreeItemsDate2En: safeParseFloat(data.sectionThree?.TotalsectionThreeItemsDate2En),
  },

  // Section Four - Other changes
  sectionFour: {
    sectionFourFirstLabel: data.sectionFour?.sectionFourFirstLabel || "",
    sectionFourLabelsEn: ensureArray(data.sectionFour?.sectionFourLabelsEn),
    sectionFourNotesEn: ensureArray(data.sectionFour?.sectionFourNotesEn),
    sectionFourItemsEn: ensureArray(data.sectionFour?.sectionFourItemsEn),
    sectionFourItemsDate2En: ensureArray(data.sectionFour?.sectionFourItemsDate2En),
    sectionFourTotalLabel: data.sectionFour?.sectionFourTotalLabel || "",
    sectionFourTotalNote: data.sectionFour?.sectionFourTotalNote || "",
    TotalsectionFourItemsEn: safeParseFloat(data.sectionFour?.TotalsectionFourItemsEn),
    TotalsectionFourItemsDate2En: safeParseFloat(data.sectionFour?.TotalsectionFourItemsDate2En),
  },

  // Section Five - Investing activities
  sectionFive: {
    sectionFiveFirstLabel: data.sectionFive?.sectionFiveFirstLabel || "",
    sectionFiveLabelsEn: ensureArray(data.sectionFive?.sectionFiveLabelsEn),
    sectionFiveNotesEn: ensureArray(data.sectionFive?.sectionFiveNotesEn),
    sectionFiveItemsEn: ensureArray(data.sectionFive?.sectionFiveItemsEn),
    sectionFiveItemsDate2En: ensureArray(data.sectionFive?.sectionFiveItemsDate2En),
    sectionFiveTotalLabel: data.sectionFive?.sectionFiveTotalLabel || "",
    sectionFiveTotalNote: data.sectionFive?.sectionFiveTotalNote || "",
    TotalsectionFiveItemsEn: safeParseFloat(data.sectionFive?.TotalsectionFiveItemsEn),
    TotalsectionFiveItemsDate2En: safeParseFloat(data.sectionFive?.TotalsectionFiveItemsDate2En),
  },
  // Section Six - Financing activities
  sectionSix: {
    sectionSixFirstLabel: data.sectionSix?.sectionSixFirstLabel || "",
    sectionSixLabelsEn: ensureArray(data.sectionSix?.sectionSixLabelsEn),
    sectionSixNotesEn: ensureArray(data.sectionSix?.sectionSixNotesEn),
    sectionSixItemsEn: ensureArray(data.sectionSix?.sectionSixItemsEn),
    sectionSixItemsDate2En: ensureArray(data.sectionSix?.sectionSixItemsDate2En),
    sectionSixTotalLabel: data.sectionSix?.sectionSixTotalLabel || "",
    sectionSixTotalNote: data.sectionSix?.sectionSixTotalNote || "",
    TotalsectionSixItemsEn: safeParseFloat(data.sectionSix?.TotalsectionSixItemsEn),
    TotalsectionSixItemsDate2En: safeParseFloat(data.sectionSix?.TotalsectionSixItemsDate2En),
    sectionSixSecondTotalLabel: data.sectionSix?.sectionSixSecondTotalLabel || "",
    sectionSixSecondTotalNote: data.sectionSix?.sectionSixSecondTotalNote || "",
    TotalsectionSixSecondItemsEn: safeParseFloat(data.sectionSix?.TotalsectionSixSecondItemsEn),
    TotalsectionSixSecondItemsDate2En: safeParseFloat(data.sectionSix?.TotalsectionSixSecondItemsDate2En),
  },

  // Section Seven - Cash and cash equivalents
  sectionSeven: {
    sectionSevenLabelsEn: ensureArray(data.sectionSeven?.sectionSevenLabelsEn),
    sectionSevenNotesEn: ensureArray(data.sectionSeven?.sectionSevenNotesEn),
    sectionSevenItemsEn: ensureArray(data.sectionSeven?.sectionSevenItemsEn),
    sectionSevenItemsDate2En: ensureArray(data.sectionSeven?.sectionSevenItemsDate2En),
    sectionSevenTotalLabel: data.sectionSeven?.sectionSevenTotalLabel || "",
    sectionSevenTotalNote: data.sectionSeven?.sectionSevenTotalNote || "",
    TotalsectionSevenItemsEn: safeParseFloat(data.sectionSeven?.TotalsectionSevenItemsEn),
    TotalsectionSevenItemsDate2En: safeParseFloat(data.sectionSeven?.TotalsectionSevenItemsDate2En),
  },

  // Section Eight - Significant non-cash transactions
  sectionEight: {
    sectionEightLabelsEn: ensureArray(data.sectionEight?.sectionEightLabelsEn),
    sectionEightNotesEn: ensureArray(data.sectionEight?.sectionEightNotesEn),
    sectionEightItemsEn: ensureArray(data.sectionEight?.sectionEightItemsEn),
    sectionEightItemsDate2En: ensureArray(data.sectionEight?.sectionEightItemsDate2En),
    sectionEightLastLabel: data.sectionEight?.sectionEightLastLabel || "",
  },

  // Table2 - Second table with its own dates
 Table2: {
    dateTwo1En: data.Table2?.dateTwo1En,
    dateTwo2En: data.Table2?.dateTwo2En,
    sectionOneTable2: {
      sectionNineLabelsEn: ensureArray(data.Table2?.sectionOneTable2?.sectionNineLabelsEn),
      sectionNineNotesEn: ensureArray(data.Table2?.sectionOneTable2?.sectionNineNotesEn),
      sectionNineItemsEn: ensureArray(data.Table2?.sectionOneTable2?.sectionNineItemsEn),
      sectionNineItemsDate2En: ensureArray(data.Table2?.sectionOneTable2?.sectionNineItemsDate2En),
    }
  }
};



          // Assign the data
          matchedDocument.formData[section].table.CashFlow = CashFlowData


          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "cashFlow  data data English saved successfully.",
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
        } else if(category === "ProfitLoss" && data){

        

         const ProfitLossDataAr = {
  date1Ar: data.qdate1,
  date2Ar: data.qdate2,
  sectionOne: {
     sectionOneFirstLabelEn: data.qsectionOne?.qsectionOneFirstLabelEn || "",
    sectionOneLabelsEn: ensureArray(data.qsectionOne?.qsectionOneLabelsEn),
    sectionOneNotesEn: ensureArray(data.qsectionOne?.qsectionOneNotesEn),
    sectionOneItemsEn: ensureArray(data.qsectionOne?.qsectionOneItemsEn),
    sectionOneItemsDate2En: ensureArray(data.qsectionOne?.qsectionOneItemsDate2En),
    sectionOneTotalLabel: data.qsectionOne?.qsectionOneTotalLabel || "",
    TotalsectionOneItemsEn: safeParseFloat(data.qsectionOne?.qTotalsectionOneItemsEn),
    TotalsectionOneItemsDate2En: safeParseFloat(data.qsectionOne?.qTotalsectionOneItemsDate2En),
  },
  sectionTwo: {
    sectionTwoLabelsEn: ensureArray(data.qsectionTwo?.qsectionTwoLabelsEn),
    sectionTwoNotesEn: ensureArray(data.qsectionTwo?.qsectionTwoNotesEn),
    sectionTwoItemsEn: ensureArray(data.qsectionTwo?.qsectionTwoItemsEn),
    sectionTwoItemsDate2En: ensureArray(data.qsectionTwo?.qsectionTwoItemsDate2En),
    sectionTwoTotalLabel: data.qsectionTwo?.qsectionTwoTotalLabel || "",
    TotalsectionTwoItemsEn: safeParseFloat(data.qsectionTwo?.qTotalsectionTwoItemsEn),
    TotalsectionTwoItemsDate2En: safeParseFloat(data.qsectionTwo?.qTotalsectionTwoItemsDate2En),
  },
  sectionThree: {
    sectionThreeLabelsEn: ensureArray(data.qsectionThree?.qsectionThreeLabelsEn),
    sectionThreeNotesEn: ensureArray(data.qsectionThree?.qsectionThreeNotesEn),
    sectionThreeItemsEn: ensureArray(data.qsectionThree?.qsectionThreeItemsEn),
    sectionThreeItemsDate2En: ensureArray(data.qsectionThree?.qsectionThreeItemsDate2En),
    sectionThreeTotalLabel: data.qsectionThree?.qsectionThreeTotalLabel || "",
    TotalsectionThreeItemsEn: safeParseFloat(data.qsectionThree?.qTotalsectionThreeItemsEn),
    TotalsectionThreeItemsDate2En: safeParseFloat(data.qsectionThree?.qTotalsectionThreeItemsDate2En),
  },
  sectionFour: {
    sectionFourLabelsEn: ensureArray(data.qsectionFour?.qsectionFourLabelsEn),
    sectionFourNotesEn: ensureArray(data.qsectionFour?.qsectionFourNotesEn),
    sectionFourItemsEn: ensureArray(data.qsectionFour?.qsectionFourItemsEn),
    sectionFourItemsDate2En: ensureArray(data.qsectionFour?.qsectionFourItemsDate2En),
    sectionFourTotalLabel: data.qsectionFour?.qsectionFourTotalLabel || "",
    TotalsectionFourItemsEn: safeParseFloat(data.qsectionFour?.qTotalsectionFourItemsEn),
    TotalsectionFourItemsDate2En: safeParseFloat(data.qsectionFour?.qTotalsectionFourItemsDate2En),
  },
  

sectionFourSub: {
     sectionFourSubFirstLabelEn: data.qsectionFourSub?.qsectionFourSubFirstLabelEn || "",
    sectionFourSubLabelsEn: ensureArray(data.qsectionFourSub?.qsectionFourSubLabelsEn),
    sectionFourSubNotesEn: ensureArray(data.qsectionFourSub?.qsectionFourSubNotesEn),
    sectionFourSubItemsEn: ensureArray(data.qsectionFourSub?.qsectionFourSubItemsEn),
    sectionFourSubItemsDate2En: ensureArray(data.qsectionFourSub?.qsectionFourSubItemsDate2En),
    sectionFourSubTotalLabel: data.qsectionFourSub?.qsectionFourSubTotalLabel || "",
    TotalsectionFourSubItemsEn: safeParseFloat(data.qsectionFourSub?.qTotalsectionFourSubItemsEn),
    TotalsectionFourSubItemsDate2En: safeParseFloat(data.qsectionFourSub?.qTotalsectionFourSubItemsDate2En),
  },  

  sectionAttributeOne: {
  sectionFourAttribute: data.qsectionAttributeOne?.qsectionFourAttribute,
  sectionFourAttributeLabelsEn: ensureArray(data.qsectionAttributeOne?.qsectionFourAttributeLabelsEn),
  sectionFourAttributeItemsEn: ensureArray(data.qsectionAttributeOne?.qsectionFourAttributeItemsEn),
  sectionFourAttributeItemsDate2En: ensureArray(data.qsectionAttributeOne?.qsectionFourAttributeItemsDate2En) ,
  TotalsectionFourAttributeItemsEn: safeParseFloat(data.qsectionAttributeOne?.qTotalsectionFourAttributeItemsEn),
  TotalsectionFourAttributeItemsDate2En: safeParseFloat(data.qsectionAttributeOne?.qTotalsectionFourAttributeItemsDate2En),
},


sectionAttributeTwo: {
  sectionFourAttribute2: data.qsectionAttributeTwo?.qsectionFourAttribute2 || "",
  sectionFourAttribute2LabelsEn: ensureArray(data.qsectionAttributeTwo?.qsectionFourAttribute2LabelsEn),
  sectionFourAttribute2ItemsEn: ensureArray(data.qsectionAttributeTwo?.qsectionFourAttribute2ItemsEn),
  sectionFourAttribute2ItemsDate2En: ensureArray(data.qsectionAttributeTwo?.qsectionFourAttribute2ItemsDate2En),
  TotalsectionFourAttribute2ItemsEn: safeParseFloat(data.qsectionAttributeTwo?.qTotalsectionFourAttribute2ItemsEn),
  TotalsectionFourAttribute2ItemsDate2En: safeParseFloat(data.qsectionAttributeTwo?.qTotalsectionFourAttribute2ItemsDate2En),
},
sectionOtherComprehensiveIncome: {
  sectionFourOtherComprehensiveIncome: data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncome || "",
  sectionFourOtherComprehensiveIncomeSubheading: data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheading || "",
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray(data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
  sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray(data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingNotesEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray(data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingItemsEn),
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray(data.qsectionOtherComprehensiveIncome?.qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
},

  Table2:{

      dateTwo1Ar:data.qTable2.qdateTwo1Ar,
      dateTwo2Ar:data.qTable2.qdateTwo2Ar,

    sectionOneTable2: {
      sectionLastLabel: data.qTable2?.qsectionOneTable2?.qsectionLastLabel || "",
      TotalsectionFourSubItemsEn: safeParseFloat(data.qTable2?.qsectionOneTable2?.qTotalsectionFourSubItemsEn),
      TotalsectionFourSubItemsDate2En: safeParseFloat(data.qTable2?.qsectionOneTable2?.qTotalsectionFourSubItemsDate2En),
      sectionSevenLastLabel: data.qTable2?.qsectionOneTable2?.qsectionSevenLastLabel || "",
      sectionSevenSubheading: data.qTable2?.qsectionOneTable2?.qsectionSevenSubheading || "",
      sectionLastLabelsEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionLastLabelsEn),
      sectionLastNotesEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionLastNotesEn),
      sectionLastItemsEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionLastItemsEn),
      sectionLastItemsDate2En: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionLastItemsDate2En),
      sectionLastTotalLabelEn: data.qTable2?.qsectionOneTable2?.qsectionLastTotalLabelEn || "",
      TotalSectionLastLabelItemsEn: safeParseFloat(data.qTable2?.qsectionOneTable2?.qTotalSectionLastLabelItemsEn),
      TotalSectionLastItemsDate2En: safeParseFloat(data.qTable2?.qsectionOneTable2?.qTotalSectionLastItemsDate2En),
    },

    sectionTwoTable2: {
      sectionSevenSubheading2: data.qTable2?.qsectionTwoTable2?.qsectionSevenSubheading2 || "",
      sectionLastLabelsEn2: ensureArray(data.qTable2?.qsectionTwoTable2?.qsectionLastLabelsEn2),
      sectionLastNotesEn2: ensureArray(data.qTable2?.qsectionTwoTable2?.qsectionLastNotesEn2),
      sectionLastItemsEn2: ensureArray(data.qTable2?.qsectionTwoTable2?.qsectionLastItemsEn2),
      sectionLastItemsDate2En2: ensureArray(data.qTable2?.qsectionTwoTable2?.qsectionLastItemsDate2En2),
      sectionLastTotalLabelEn2: data.qTable2?.qsectionTwoTable2?.qsectionLastTotalLabelEn2 || "",
      TotalSectionLastLabelItemsEn2: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qTotalSectionLastLabelItemsEn2),
      TotalSectionLastItemsDate2En2: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qTotalSectionLastItemsDate2En2),

      totalOtherComp: {
        SectionSevenSecondLastLabel2: data.qTable2?.qsectionTwoTable2?.qtotalOtherComp?.qSectionSevenSecondLastLabel2 || "",
        TotalsectionSevenSecondLastItemEn: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qtotalOtherComp?.qTotalsectionSevenSecondLastItemEn),
        TotalsectionSevenSecondLastItemsDate2En: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qtotalOtherComp?.qTotalsectionSevenSecondLastItemsDate2En),
      },

      totalComprehensiveLoss: {
        SectionSevenLastLabel2: data.qTable2?.qsectionTwoTable2?.qtotalComprehensiveLoss?.qSectionSevenLastLabel2 || "",
        TotalsectionSevenLastItemEn: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qtotalComprehensiveLoss?.qTotalsectionSevenLastItemEn),
        TotalsectionSevenLastItemsDate2En: safeParseFloat(data.qTable2?.qsectionTwoTable2?.qtotalComprehensiveLoss?.qTotalsectionSevenLastItemsDate2En),
      },
    },

    sectionAttributeOneTable2: {
    sectionFourAttributeTable2: data.qTable2?.qsectionAttributeOneTable2?.qsectionFourAttributeTable2 || "",
    sectionFourAttributeLabelsEnTable2: ensureArray(data.qTable2?.qsectionAttributeOneTable2?.qsectionFourAttributeLabelsEnTable2),
    sectionFourAttributeItemsEnTable2: ensureArray(data.qTable2?.qsectionAttributeOneTable2?.qsectionFourAttributeItemsEnTable2),
    sectionFourAttributeItemsDate2EnTable2: ensureArray(data.qTable2?.qsectionAttributeOneTable2?.qsectionFourAttributeItemsDate2EnTable2),
    TotalsectionFourAttributeItemsEnTable2: safeParseFloat(data.qTable2?.qsectionAttributeOneTable2?.qTotalsectionFourAttributeItemsEnTable2),
    TotalsectionFourAttributeItemsDate2EnTable2: safeParseFloat(data.qTable2?.qsectionAttributeOneTable2?.qTotalsectionFourAttributeItemsDate2EnTable2),
    },

    sectionAttributeTwoTable2: {
      sectionFourAttribute2Table2: data.qTable2?.qsectionAttributeTwoTable2?.qsectionFourAttribute2Table2 || "",
      sectionFourAttribute2LabelsEnTable2: ensureArray(data.qTable2?.qsectionAttributeTwoTable2?.qsectionFourAttribute2LabelsEnTable2),
      sectionFourAttribute2ItemsEnTable2: ensureArray(data.qTable2?.qsectionAttributeTwoTable2?.qsectionFourAttribute2ItemsEnTable2),
      sectionFourAttribute2ItemsDate2EnTable2: ensureArray(data.qTable2?.qsectionAttributeTwoTable2?.qsectionFourAttribute2ItemsDate2EnTable2),
      TotalsectionFourAttribute2ItemsEnTable2: safeParseFloat(data.qTable2?.qsectionAttributeTwoTable2?.qTotalsectionFourAttribute2ItemsEnTable2),
      TotalsectionFourAttribute2ItemsDate2EnTable2: safeParseFloat(data.qTable2?.qsectionAttributeTwoTable2?.qTotalsectionFourAttribute2ItemsDate2EnTable2),
    },

    sectionOtherComprehensiveIncomeTable2: {
      sectionFourOtherComprehensiveIncomeTable2: data.qTable2?.qsectionOtherComprehensiveIncomeTable2?.qsectionFourOtherComprehensiveIncomeTable2 || "",
      sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: ensureArray(data.qTable2?.qsectionOtherComprehensiveIncomeTable2?.qsectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2),
      sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: ensureArray(data.qTable2?.qsectionOtherComprehensiveIncomeTable2?.qsectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2),
      sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: ensureArray(data.qTable2?.qsectionOtherComprehensiveIncomeTable2?.qsectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2),
      sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: ensureArray(data.qTable2?.qsectionOtherComprehensiveIncomeTable2?.qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2),
    },
  }

};

          // Assign the data
          matchedDocument.formData[section].table.ProfitLoss = ProfitLossDataAr;

          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "ProfitLoss  data Arabic saved successfully.",
              Tabledata: matchedDocument.formData[section].table.ProfitLoss,
            });
          } catch (saveError) {
            console.error("Error saving document:", saveError);
            return res.status(500).json({
              success: false,
              message: "Error saving document",
              error: saveError.message,
            });
          }

        }
        
        
         else if (category === "CashFlow" && data) {

const CashFlowData = {
  // Main dates
  date1En: data.qdate1,
  date2En: data.qdate2,

  // Section One - Operating activities
  sectionOne: {
    sectionOneFirstLabelEn: data.qsectionOne?.qsectionOneFirstLabelEn || "",
    sectionOneSecondLabelEn: data.qsectionOne?.qsectionOneSecondLabelEn || "",
    sectionOneLabelsEn: ensureArray(data.qsectionOne?.qsectionOneLabelsEn),
    sectionOneNotesEn: ensureArray(data.qsectionOne?.qsectionOneNotesEn),
    sectionOneItemsEn: ensureArray(data.qsectionOne?.qsectionOneItemsEn),
    sectionOneItemsDate2En: ensureArray(data.qsectionOne?.qsectionOneItemsDate2En),
  },

  // Section Two - Adjustments for
  sectionTwo: {
    sectionTwoFirstLabel: data.qsectionTwo?.qsectionTwoFirstLabel || "",
    sectionTwoLabelsEn: ensureArray(data.qsectionTwo?.qsectionTwoLabelsEn),
    sectionTwoNotesEn: ensureArray(data.qsectionTwo?.qsectionTwoNotesEn),
    sectionTwoItemsEn: ensureArray(data.qsectionTwo?.qsectionTwoItemsEn),
    sectionTwoItemsDate2En: ensureArray(data.qsectionTwo?.qsectionTwoItemsDate2En),
    sectionTwoTotalLabel: data.qsectionTwo?.qsectionTwoTotalLabel || "",
    sectionTwoTotalNote: data.qsectionTwo?.qsectionTwoTotalNote || "",
    TotalsectionTwoItemsEn: safeParseFloat(data.qsectionTwo?.qTotalsectionTwoItemsEn),
    TotalsectionTwoItemsDate2En: safeParseFloat(data.qsectionTwo?.qTotalsectionTwoItemsDate2En),
  },

  // Section Three - Working capital adjustments
sectionThree: {
  sectionThreeFirstLabel: data.qsectionThree?.qsectionThreeFirstLabel || "",
  sectionThreeLabelsEn: ensureArray(data.qsectionThree?.qsectionThreeLabelsEn),
  sectionThreeNotesEn: ensureArray(data.qsectionThree?.qsectionThreeNotesEn),
  sectionThreeItemsEn: ensureArray(data.qsectionThree?.qsectionThreeItemsEn),
  sectionThreeItemsDate2En: ensureArray(data.qsectionThree?.qsectionThreeItemsDate2En),
  sectionThreeTotalLabel: data.qsectionThree?.qsectionThreeTotalLabel || "",
  sectionThreeTotalNote: data.qsectionThree?.qsectionThreeTotalNote || "",
  TotalsectionThreeItemsEn: safeParseFloat(data.qsectionThree?.qTotalsectionThreeItemsEn),
  TotalsectionThreeItemsDate2En: safeParseFloat(data.qsectionThree?.qTotalsectionThreeItemsDate2En),
},

  // Section Four - Other changes
 sectionFour: {
  sectionFourFirstLabel: data.qsectionFour?.qsectionFourFirstLabel || "",
  sectionFourLabelsEn: ensureArray(data.qsectionFour?.qsectionFourLabelsEn),
  sectionFourNotesEn: ensureArray(data.qsectionFour?.qsectionFourNotesEn),
  sectionFourItemsEn: ensureArray(data.qsectionFour?.qsectionFourItemsEn),
  sectionFourItemsDate2En: ensureArray(data.qsectionFour?.qsectionFourItemsDate2En),
  sectionFourTotalLabel: data.qsectionFour?.qsectionFourTotalLabel || "",
  sectionFourTotalNote: data.qsectionFour?.qsectionFourTotalNote || "",
  TotalsectionFourItemsEn: safeParseFloat(data.qsectionFour?.qTotalsectionFourItemsEn),
  TotalsectionFourItemsDate2En: safeParseFloat(data.qsectionFour?.qTotalsectionFourItemsDate2En),
},


  // Section Five - Investing activities
sectionFive: {
  sectionFiveFirstLabel: data.qsectionFive?.qsectionFiveFirstLabel || "",
  sectionFiveLabelsEn: ensureArray(data.qsectionFive?.qsectionFiveLabelsEn),
  sectionFiveNotesEn: ensureArray(data.qsectionFive?.qsectionFiveNotesEn),
  sectionFiveItemsEn: ensureArray(data.qsectionFive?.qsectionFiveItemsEn),
  sectionFiveItemsDate2En: ensureArray(data.qsectionFive?.qsectionFiveItemsDate2En),
  sectionFiveTotalLabel: data.qsectionFive?.qsectionFiveTotalLabel || "",
  sectionFiveTotalNote: data.qsectionFive?.qsectionFiveTotalNote || "",
  TotalsectionFiveItemsEn: safeParseFloat(data.qsectionFive?.qTotalsectionFiveItemsEn),
  TotalsectionFiveItemsDate2En: safeParseFloat(data.qsectionFive?.qTotalsectionFiveItemsDate2En),
},

  // Section Six - Financing activities
 sectionSix: {
  sectionSixFirstLabel: data.qsectionSix?.qsectionSixFirstLabel || "",
  sectionSixLabelsEn: ensureArray(data.qsectionSix?.qsectionSixLabelsEn),
  sectionSixNotesEn: ensureArray(data.qsectionSix?.qsectionSixNotesEn),
  sectionSixItemsEn: ensureArray(data.qsectionSix?.qsectionSixItemsEn),
  sectionSixItemsDate2En: ensureArray(data.qsectionSix?.qsectionSixItemsDate2En),
  sectionSixTotalLabel: data.qsectionSix?.qsectionSixTotalLabel || "",
  sectionSixTotalNote: data.qsectionSix?.qsectionSixTotalNote || "",
  TotalsectionSixItemsEn: safeParseFloat(data.qsectionSix?.qTotalsectionSixItemsEn),
  TotalsectionSixItemsDate2En: safeParseFloat(data.qsectionSix?.qTotalsectionSixItemsDate2En),
  sectionSixSecondTotalLabel: data.qsectionSix?.qsectionSixSecondTotalLabel || "",
  sectionSixSecondTotalNote: data.qsectionSix?.qsectionSixSecondTotalNote || "",
  TotalsectionSixSecondItemsEn: safeParseFloat(data.qsectionSix?.qTotalsectionSixSecondItemsEn),
  TotalsectionSixSecondItemsDate2En: safeParseFloat(data.qsectionSix?.qTotalsectionSixSecondItemsDate2En),
},


  // Section Seven - Cash and cash equivalents
sectionSeven: {
  sectionSevenLabelsEn: ensureArray(data.qsectionSeven?.qsectionSevenLabelsEn),
  sectionSevenNotesEn: ensureArray(data.qsectionSeven?.qsectionSevenNotesEn),
  sectionSevenItemsEn: ensureArray(data.qsectionSeven?.qsectionSevenItemsEn),
  sectionSevenItemsDate2En: ensureArray(data.qsectionSeven?.qsectionSevenItemsDate2En),
  sectionSevenTotalLabel: data.qsectionSeven?.qsectionSevenTotalLabel || "",
  sectionSevenTotalNote: data.qsectionSeven?.qsectionSevenTotalNote || "",
  TotalsectionSevenItemsEn: safeParseFloat(data.qsectionSeven?.qTotalsectionSevenItemsEn),
  TotalsectionSevenItemsDate2En: safeParseFloat(data.qsectionSeven?.qTotalsectionSevenItemsDate2En),
},


  // Section Eight - Significant non-cash transactions
 sectionEight: {
  sectionEightLabelsEn: ensureArray(data.qsectionEight?.qsectionEightLabelsEn),
  sectionEightNotesEn: ensureArray(data.qsectionEight?.qsectionEightNotesEn),
  sectionEightItemsEn: ensureArray(data.qsectionEight?.qsectionEightItemsEn),
  sectionEightItemsDate2En: ensureArray(data.qsectionEight?.qsectionEightItemsDate2En),
  sectionEightLastLabel: data.qsectionEight?.qsectionEightLastLabel || "",
},

  // Table2 - Second table with its own dates
Table2: {
  dateTwo1En: data.qTable2?.qdateTwo1En,
  dateTwo2En: data.qTable2?.qdateTwo2En,
  sectionOneTable2: {
    sectionNineLabelsEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionNineLabelsEn),
    sectionNineNotesEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionNineNotesEn),
    sectionNineItemsEn: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionNineItemsEn),
    sectionNineItemsDate2En: ensureArray(data.qTable2?.qsectionOneTable2?.qsectionNineItemsDate2En),
  }
}
};



          // Assign the data
          matchedDocument.formData[section].table.CashFlow = CashFlowData


          try {
            await matchedDocument.save();
            return res.status(200).json({
              success: true,
              message: "CashFlow Data data data English saved successfully.",
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





 

} else
        
        {
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
