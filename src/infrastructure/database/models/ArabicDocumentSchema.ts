import { model, Schema } from "mongoose";

const BalanceSheetSchema = new Schema({
  assets: {
    current: {
      scurrentAssets: String,
      currentLabels: [String],
      items: [String],
      itemsDate2: [String],
      currentSubLabels: [String],
      subItems: [String],
      subItemsDate2: [String],
      firstTotal: Number,
      firstTotalDate2: Number,
      secondTotal: Number,
      secondTotalDate2: Number,
      sfirtsTotalCurrentAssets: String,
      stotalCurrentAssets: String,
      CurrentAssetsNotes: [String],
    },
    nonCurrent: {
      snonCurrentAssets: String,
      nonCurrentLabels: [String],
      items: [String],
      itemsDate2: [String],
      nonCurrentSubLabels: [String],
      subItems: [String],
      subItemsDate2: [String],
      firstTotal: Number,
      firstTotalDate2: Number,
      secondTotal: Number,
      secondTotalDate2: Number,
      sfirtsTotalnonCurrentAssets: String,
      stotalNonCurrentAssets: String,
      nonCurrentNotes: [String],
    },
    sassets: String,
    stotalAssets: String,
    totalAssets: Number,
    totalAssetsDate2: Number,
  },
  equity: {
    sShareholdersEquity: String,
    equityLabels: [String],
    items: [String],
    itemsDate2: [String],
    subItems: [String],
    subItemsDate2: [String],
    firstTotal: Number,
    firstTotalDate2: Number,
    equitySubLabels: [String],
    sfirtsTotalShareholdersEquity: String,
    stotalShareholdersEquity: String,
    totalEquity: Number,
    totalEquityDate2: Number,
    equityItemsNotes: [String],
  },
  liabilities: {
    liabilities: String,
    current: {
      scurrentliabilities: String,
      currentLiabilitiesLabels: [String],
      items: [String],
      itemsDate2: [String],
      currentLiabilitiesSubLabels: [String],
      subItems: [String],
      subItemsDate2: [String],
      firstTotal: Number,
      firstTotalDate2: Number,
      sfirtsTotalcurrentLiabilities: String,
      stotalcurrentliabilities: String,
      total: Number,
      totalDate2: Number,
      currentLiabilitiesNotes: [String],
    },
    nonCurrent: {
      sNoncurrentliabilities: String,
      NonCurrentLiabilitiesLabels: [String],
      items: [String],
      itemsDate2: [String],
      NonCurrentLiabilitiesSubLabels: [String],
      subItems: [String],
      subItemsDate2: [String],
      firstTotal: Number,
      firstTotalDate2: Number,
      sfirtsTotalNoncurrentLiabilities: String,
      stotalNoncurrentliabilities: String,
      total: Number,
      totalDate2: Number,
      nonCurrentLiabilitiesNotes: [String],
    },
    stotalliabilities: String,
    totalLiabilities: Number,
    totalLiabilitiesDate2: Number,
  },
  sShareholdersEquityandliabilitiess: String,
  stotalEquityAndLiabilities: String,
  ItotalEquityAndLiabilities: Number,
  ItotalEquityAndLiabilitiesDate2: Number,
});

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
      type: BalanceSheetSchema,
      required: false,
    },
    ProfitLoss: {
      type: String,
      required: false,
    },
    CashFlow: {
      type: String,
      required: false,
    },
  },
});

const DocumentSchema = new Schema(
  {
    fullNameAr: {
      type: String,
      required: true,
    },
    nickNameAr: {
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

export const ArabicDocument = model("ArabicDocument", DocumentSchema);
