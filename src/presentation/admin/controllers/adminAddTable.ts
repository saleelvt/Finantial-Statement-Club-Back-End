import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";

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
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      console.log("Received files:", req.files, tadawalCode);

      // Process the document based on language
      const DocumentModel = language === "Arabic" ? ArabicDocument : Document;
      
      // Find existing documents with the provided Tadawal code
      const existingDocuments = await Document.find({tadawalCode})
      
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
            // Current assets subsection
            current: {
              scurrentAssets: data.assets.current.scurrentAssets || "Current Assets",
              items: data.assets.current.items || [],
              itemsDate2: data.assets.current.itemsDate2 || [],
              subItems: data.assets.current.subItems || [],
              subItemsDate2: data.assets.current.subItemsDate2 || [],
              firstTotal: parseFloat(data.assets.current.firstTotal) || 0,
              firstTotalDate2: parseFloat(data.assets.current.firstTotalDate2) || 0,
              secondTotal: parseFloat(data.assets.current.secondTotal) || 0,
              secondTotalDate2: parseFloat(data.assets.current.secondTotalDate2) || 0,
              sfirtsTotalCurrentAssets: data.assets.current.sfirtsTotalCurrentAssets || "",
              stotalCurrentAssets: data.assets.current.stotalCurrentAssets || "Total Current Assets",
              CurrentAssetsNotes: data.assets.current.CurrentAssetsNotes || []
            },
            
            // Non-current assets subsection
            nonCurrent: {
              snonCurrentAssets: data.assets.nonCurrent.snonCurrentAssets || "Non-current Assets",
              items: data.assets.nonCurrent.items || [],
              itemsDate2: data.assets.nonCurrent.itemsDate2 || [],
              subItems: data.assets.nonCurrent.subItems || [],
              subItemsDate2: data.assets.nonCurrent.subItemsDate2 || [],
              firstTotal: parseFloat(data.assets.nonCurrent.firstTotal) || 0,
              firstTotalDate2: parseFloat(data.assets.nonCurrent.firstTotalDate2) || 0,
              secondTotal: parseFloat(data.assets.nonCurrent.secondTotal) || 0,
              secondTotalDate2: parseFloat(data.assets.nonCurrent.secondTotalDate2) || 0,
              sfirtsTotalnonCurrentAssets: data.assets.nonCurrent.sfirtsTotalnonCurrentAssets || "",
              stotalNonCurrentAssets: data.assets.nonCurrent.stotalNonCurrentAssets ,
              nonCurrentNotes: data.assets.nonCurrent.nonCurrentNotes || []
            },
            
            // Asset totals and labels
            sassets: data.assets.sassets ,
            stotalAssets: data.assets.stotalAssets ,
            totalAssets: parseFloat(data.assets.totalAssets) || 0,
            totalAssetsDate2: parseFloat(data.assets.totalAssetsDate2) || 0
          },
          
          // Additional data fields
          data1En: data.data1En || null,
          data2En: data.data2En || null,
          
          // Equity section
          equity: {
            sShareholdersEquity: data.equity.sShareholdersEquity ,
            items: data.equity.items || [],
            itemsDate2: data.equity.itemsDate2 || [],
            subItems: data.equity.subItems || [],
            subItemsDate2: data.equity.subItemsDate2 || [],
            firstTotal: parseFloat(data.equity.firstTotal) || 0,
            firstTotalDate2: parseFloat(data.equity.firstTotalDate2) || 0,
            sfirtsTotalShareholdersEquity: data.equity.sfirtsTotalShareholdersEquity || "",
            stotalShareholdersEquity: data.equity.stotalShareholdersEquity ,
            totalEquity: parseFloat(data.equity.totalEquity) || 0,
            totalEquityDate2: parseFloat(data.equity.totalEquityDate2) || 0,
            equityItemsNotes: data.equity.equityItemsNotes || []
          },
          
          // Liabilities section
          liabilities: {
            // Label for liabilities section
            liabilities: data.liabilities.liabilities ,
            
            // Current liabilities subsection
            current: {
              scurrentliabilities: data.liabilities.current.scurrentliabilities ,
              items: data.liabilities.current.items || [],
              itemsDate2: data.liabilities.current.itemsDate2 || [],
              subItems: data.liabilities.current.subItems || [],
              subItemsDate2: data.liabilities.current.subItemsDate2 || [],
              firstTotal: parseFloat(data.liabilities.current.firstTotal) || 0,
              firstTotalDate2: parseFloat(data.liabilities.current.firstTotalDate2) || 0,
              sfirtsTotalcurrentLiabilities: data.liabilities.current.sfirtsTotalcurrentLiabilities,
              stotalcurrentliabilities: data.liabilities.current.stotalcurrentliabilities ,
              total: parseFloat(data.liabilities.current.total) || 0,
              totalDate2: parseFloat(data.liabilities.current.totalDate2) || 0,
              currentLiabilitiesNotes: data.liabilities.current.currentLiabilitiesNotes || []
            },
            
            // Non-current liabilities subsection
            nonCurrent: {
              sNoncurrentliabilities: data.liabilities.nonCurrent.sNoncurrentliabilities ,
              items: data.liabilities.nonCurrent.items || [],
              itemsDate2: data.liabilities.nonCurrent.itemsDate2 || [],
              subItems: data.liabilities.nonCurrent.subItems || [],
              subItemsDate2: data.liabilities.nonCurrent.subItemsDate2 || [],
              firstTotal: parseFloat(data.liabilities.nonCurrent.firstTotal) || 0,
              firstTotalDate2: parseFloat(data.liabilities.nonCurrent.firstTotalDate2) || 0,
              sfirtsTotalNoncurrentLiabilities: data.liabilities.nonCurrent.sfirtsTotalNoncurrentLiabilities ,
              stotalNoncurrentliabilities: data.liabilities.nonCurrent.stotalNoncurrentliabilities,
              total: parseFloat(data.liabilities.nonCurrent.total) || 0,
              totalDate2: parseFloat(data.liabilities.nonCurrent.totalDate2) || 0,
              nonCurrentLiabilitiesNotes: data.liabilities.nonCurrent.nonCurrentLiabilitiesNotes || []
            },
            
            // Liability totals
            stotalliabilities: data.liabilities.stotalliabilities ,
            totalLiabilities: parseFloat(data.liabilities.totalLiabilities) || 0,
            totalLiabilitiesDate2: parseFloat(data.liabilities.totalLiabilitiesDate2) || 0
          },
          
          // Section headings and totals
          sShareholdersEquityandliabilitiess: data.sShareholdersEquityandliabilitiess ,
          stotalEquityAndLiabilities: data.stotalEquityAndLiabilities,
          
          // Total values at the balance sheet level
          ItotalEquityAndLiabilities: parseFloat(data.ItotalEquityAndLiabilities) || 0,
          ItotalEquityAndLiabilitiesDate2: parseFloat(data.ItotalEquityAndLiabilitiesDate2) || 0
        };

        // Update the BalanceSheet data in the document
        matchedDocument.formData[section].table.BalanceSheet = balanceSheetData;
        
        // Save the updated document
        await matchedDocument.save();
        return res.status(200).json({
          success: true,
          message: "Balance sheet data saved successfully.",
          data: matchedDocument.formData[section].table.BalanceSheet
        });
      }  else {
        return res.status(400).json({
          success: false,
          message: "Invalid table category or missing data."
        });
      }
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
};