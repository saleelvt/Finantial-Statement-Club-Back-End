import { model, Schema } from "mongoose";

const FileSchema = new Schema({
  file: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  table: {
    BalanceSheet: {
      type: String, required: false
    },

    // S3 URL for Balance Sheet
    ProfitLoss: { type: String, required: false }, // S3 URL for Profit & Loss
    CashFlow: { type: String, required: false }, // S3 URL for Cash Flow
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto timestamp for tracking updates
  },
});