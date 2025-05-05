import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Document } from "@/infrastructure/database/models/documentSchema";
import { ArabicDocument } from "@/infrastructure/database/models/ArabicDocumentSchema";
import { Request, Response, NextFunction } from "express";

export const adminDeleteTableController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
    try {
      console.log("Delete table endpoint triggered");
      
      const { TadawulCode } = req.params;
      const { language, quarterYear, selectedTableType, selectedYear } = req.query;

      console.log("Parameters received:", TadawulCode, language, quarterYear, selectedTableType, selectedYear);
      
      // Validate required parameters
      if (!TadawulCode || !language || !quarterYear || !selectedTableType || !selectedYear) {
        return res.status(400).json({ 
          message: "Missing required parameters", 
          success: false 
        });
      }

      // Convert query params to strings
      const yearStr = selectedYear as string;
      const quarterStr = quarterYear as string;
      const tableType = selectedTableType as string;
      
      // Find the appropriate document based on language
      let documentModel;
      if (language === "Arabic") {
        documentModel = ArabicDocument;
      } else {
        documentModel = Document;
      }
      
      // Step 1: Find document by TadawulCode
      const docs = await documentModel.find({ tadawalCode: TadawulCode });
      
      if (!docs || docs.length === 0) {
        return res.status(404).json({ 
          message: "No documents found with the provided Tadawul Code", 
          success: false 
        });
      }
      
      // Step 2: Find the document with the matching year
      const getDocWithMatchingYear = (documents) => {
        for (const doc of documents) {
          // Check formData properties in order of priority
          const priorityOrder = ['Board', 'Year', 'S1', 'Q4', 'Q3', 'Q2', 'Q1'];
          
          for (const period of priorityOrder) {
            if (doc.formData[period] && doc.formData[period].year === yearStr) {
              return doc;
            }
          }
        }
        return null;
      };
      
      const targetDoc = getDocWithMatchingYear(docs);
      
      if (!targetDoc) {
        return res.status(404).json({ 
          message: `No document found for year ${yearStr}`, 
          success: false 
        });
      }
      
      // Step 3: Delete the specified table from the selected quarter/year
      if (!targetDoc.formData[quarterStr]) {
        return res.status(404).json({ 
          message: `Quarter/period ${quarterStr} not found in the document`, 
          success: false 
        });
      }
      
      if (!targetDoc.formData[quarterStr].table[tableType]) {
        return res.status(404).json({ 
          message: `Table ${tableType} not found in ${quarterStr}`, 
          success: false 
        });
      }
      
      // Delete the selected table by setting it to null or empty string
      targetDoc.formData[quarterStr].table[tableType] = "";
      
      // Save the updated document
      await targetDoc.save();
      
      return res.status(200).json({
        message: `Successfully deleted ${tableType} table from ${quarterStr} for year ${yearStr}`,
        success: true,
        data: targetDoc
      });
      
    } catch (error) {
      console.error("Error in adminDeleteTableController:", error);
      next(error);
    }
  };
};