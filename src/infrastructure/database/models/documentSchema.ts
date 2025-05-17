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
      // Assets section
      assets: {
        // Current assets subsection
        current: {
          scurrentAssets: { type: String },
          currentLabels: { type: [String] },
          items: { type: [String] },
          itemsDate2: { type: [String] },
          currentSubLabels: { type: [String] },
          subItems: { type: [String] },
          subItemsDate2: { type: [String] },
          firstTotal: { type: Number },
          firstTotalDate2: { type: Number },
          secondTotal: { type: Number },
          secondTotalDate2: { type: Number },
          sfirtsTotalCurrentAssets: { type: String },
          stotalCurrentAssets: { type: String },
          CurrentAssetsNotes: { type: [String] },
        },

        // Non-current assets subsection
        nonCurrent: {
          snonCurrentAssets: { type: String },
          nonCurrentLabels: { type: [String] },
          items: { type: [String] },
          itemsDate2: { type: [String] },
          nonCurrentSubLabels: { type: [String] },
          subItems: { type: [String] },
          subItemsDate2: { type: [String] },
          firstTotal: { type: Number },
          firstTotalDate2: { type: Number },
          secondTotal: { type: Number },
          secondTotalDate2: { type: Number },
          sfirtsTotalnonCurrentAssets: { type: String },
          stotalNonCurrentAssets: { type: String },
          nonCurrentNotes: { type: [String] },
        },
        // Asset totals and labels
        sassets: { type: String },
        stotalAssets: { type: String },
        totalAssets: { type: Number },
        totalAssetsDate2: { type: Number },
      },

      // Additional data fields
      data1En: { type: Schema.Types.Mixed },
      data2En: { type: Schema.Types.Mixed },

      // Equity section
      equity: {
        sShareholdersEquity: { type: String },
        equityLabels: { type: [String] },
        items: { type: [String] },
        itemsDate2: { type: [String] },
        subItems: { type: [String] },
        subItemsDate2: { type: [String] },
        firstTotal: { type: Number },
        firstTotalDate2: { type: Number },
        equitySubLabels: { type: [String] },
        sfirtsTotalShareholdersEquity: { type: String },
        stotalShareholdersEquity: { type: String },
        totalEquity: { type: Number },
        totalEquityDate2: { type: Number },
        equityItemsNotes: { type: [String] },
      },
      // Liabilities section
      liabilities: {
        // Label for liabilities section
        liabilities: { type: String },

        // Current liabilities subsection
        current: {
          scurrentliabilities: { type: String },
          currentLiabilitiesLabels: { type: [String] },
          currentLiabilitiesSubLabels: { type: [String] },
          items: { type: [String] },
          itemsDate2: { type: [String] },
          subItems: { type: [String] },
          subItemsDate2: { type: [String] },
          firstTotal: { type: Number },
          firstTotalDate2: { type: Number },
          sfirtsTotalcurrentLiabilities: { type: String },
          stotalcurrentliabilities: { type: String },
          total: { type: Number },
          totalDate2: { type: Number },
          currentLiabilitiesNotes: { type: [String] },
        },

        // Non-current liabilities subsection
        nonCurrent: {
          sNoncurrentliabilities: { type: String },
          NonCurrentLiabilitiesLabels: { type: [String] },
          items: { type: [String] },
          itemsDate2: { type: [String] },
          NonCurrentLiabilitiesSubLabels: { type: [String] },
          subItems: { type: [String] },
          subItemsDate2: { type: [String] },
          firstTotal: { type: Number },
          firstTotalDate2: { type: Number },
          sfirtsTotalNoncurrentLiabilities: { type: String },
          stotalNoncurrentliabilities: { type: String },
          total: { type: Number },
          totalDate2: { type: Number },
          nonCurrentLiabilitiesNotes: { type: [String] },
        },
        // Liability totals
        stotalliabilities: { type: String },
        totalLiabilities: { type: Number },
        totalLiabilitiesDate2: { type: Number },
      },

      // Section headings and totals
      sShareholdersEquityandliabilitiess: { type: String },
      stotalEquityAndLiabilities: { type: String },
      // Total values at the balance sheet level
      ItotalEquityAndLiabilities: { type: Number },
      ItotalEquityAndLiabilitiesDate2: { type: Number },
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

const DocumentSchema = new Schema(
  {
    fullNameEn: {
      type: String,
      required: true,
    },
    nickNameEn: {
      type: String,
      required: true,
    },
    tadawalCode: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    formData: {
      Board: { type: FileSchema, required: false },
      Q1: { type: FileSchema, required: false },
      Q2: { type: FileSchema, required: false },
      Q3: { type: FileSchema, required: false },
      Q4: { type: FileSchema, required: false },
      S1: { type: FileSchema, required: false },
      Year: { type: FileSchema, required: false },
    },
  },
  {
    timestamps: true,
  }
);

export const Document = model("Document", DocumentSchema);
