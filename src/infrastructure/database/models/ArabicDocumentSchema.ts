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


 CashFlow: {
  // Additional data fields
      date1Ar: { type: Schema.Types.Mixed },
      date2Ar: { type: Schema.Types.Mixed },
  sectionOne: {
    sectionOneLabelsEn:{ type: [String] },
    sectionOneNotesEn: { type: [String] },
    sectionOneItemsEn:{ type: [String] },
    sectionOneItemsDate2En: { type: [String] },
    sectionOneTotalLabel: String,
    TotalsectionOneItemsEn: Number,
    TotalsectionOneItemsDate2En: Number,
  },

  sectionTwo: {
    sectionTwoLabelsEn:{ type: [String] },
    sectionTwoNotesEn:{ type: [String] },
    sectionTwoItemsEn:{ type: [String] },
    sectionTwoItemsDate2En:{ type: [String] },
    sectionTwoTotalLabel: String,
    TotalsectionTwoItemsEn: Number,
    TotalsectionTwoItemsDate2En: Number,
  },

  sectionThree: {
    sectionThreeLabelsEn:{ type: [String] },
    sectionThreeNotesEn: { type: [String] },
    sectionThreeItemsEn:{ type: [String] },
    sectionThreeItemsDate2En:{ type: [String] },
    sectionThreeTotalLabel: String,
    TotalsectionThreeItemsEn: Number,
    TotalsectionThreeItemsDate2En: Number,
  },
  sectionFour: {
    sectionFourLabelsEn:{ type: [String] },
    sectionFourNotesEn:{ type: [String] },
    sectionFourItemsEn:{ type: [String] },
    sectionFourItemsDate2En:{ type: [String] },
    sectionFourTotalLabel: String,
    TotalsectionFourItemsEn: Number,
    TotalsectionFourItemsDate2En: Number,
  },

   sectionFourAttributeOne: {
  sectionFourAttribute: { type: String },
  sectionFourAttributeLabelsEn: { type: [String] },
  sectionFourAttributeItemsEn: { type: [String] },
  sectionFourAttributeItemsDate2En: { type: [String] },
  TotalsectionFourAttributeItemsEn: { type: Number },
  TotalsectionFourAttributeItemsDate2En: { type: Number },
},

sectionOtherComprehensiveIncome: {
  sectionFourOtherComprehensiveIncome: { type: String },
  sectionFourOtherComprehensiveIncomeSubheading: { type: String },
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: { type: [String] },
  sectionFourOtherComprehensiveIncomeSubheadingNotesEn: { type: [String] },
  sectionFourOtherComprehensiveIncomeSubheadingItemsEn: { type: [String] },
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: { type: [String] },
  sectionFourOtherTotalComprehensiveIncome: { type: String },
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn: { type: Number },
  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: { type: Number },
},

sectionAttributeTwo: {
  sectionFourAttribute2: { type: String },
  sectionFourAttribute2LabelsEn: { type: [String] },
  sectionFourAttribute2ItemsEn: { type: [String] },
  sectionFourAttribute2ItemsDate2En: { type: [String] },
  TotalsectionFourAttribute2ItemsEn: { type: Number },
  TotalsectionFourAttribute2ItemsDate2En: { type: Number },
},



  sectionFive: {
    sectionFiveLabelsEn: { type: [String] },
    sectionFiveNotesEn:{ type: [String] },
    sectionFiveItemsEn:{ type: [String] },
    sectionFiveItemsDate2En: { type: [String] },
    sectionFiveTotalLabel: String,
    TotalsectionFiveItemsEn: Number,
    TotalsectionFiveItemsDate2En: Number,
  },
  sectionSix: {
    sectionSixLabelsEn:{ type: [String] },
    sectionSixNotesEn:{ type: [String] },
    sectionSixItemsEn: { type: [String] },
    sectionSixItemsDate2En: { type: [String] },
    sectionSixTotalLabel: String,
    TotalsectionSixItemsEn: Number,
    TotalsectionSixItemsDate2En: Number,
  },
}

  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto timestamp for tracking updates
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
