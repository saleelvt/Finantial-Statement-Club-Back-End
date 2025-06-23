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
      ItotalEquityAndLiabilities: { type: Number },
      ItotalEquityAndLiabilitiesDate2: { type: Number },
    },
    CashFlow: {
      date1En: { type: Schema.Types.Mixed },
      date2En: { type: Schema.Types.Mixed },
      sectionOne: {
        sectionOneFirstLabelEn: String,
        sectionOneLabelsEn: { type: [String] },
        sectionOneNotesEn: { type: [String] },
        sectionOneItemsEn: { type: [String] },
        sectionOneItemsDate2En: { type: [String] },
        sectionOneTotalLabel: String,
        TotalsectionOneItemsEn: Number,
        TotalsectionOneItemsDate2En: Number,
      },

      sectionTwo: {
        sectionTwoLabelsEn: { type: [String] },
        sectionTwoNotesEn: { type: [String] },
        sectionTwoItemsEn: { type: [String] },
        sectionTwoItemsDate2En: { type: [String] },
        sectionTwoTotalLabel: String,
        TotalsectionTwoItemsEn: Number,
        TotalsectionTwoItemsDate2En: Number,
      },

      sectionThree: {
        sectionThreeLabelsEn: { type: [String] },
        sectionThreeNotesEn: { type: [String] },
        sectionThreeItemsEn: { type: [String] },
        sectionThreeItemsDate2En: { type: [String] },
        sectionThreeTotalLabel: String,
        TotalsectionThreeItemsEn: Number,
        TotalsectionThreeItemsDate2En: Number,
      },

      sectionFour: {
        sectionFourLabelsEn: { type: [String] },
        sectionFourNotesEn: { type: [String] },
        sectionFourItemsEn: { type: [String] },
        sectionFourItemsDate2En: { type: [String] },
        sectionFourTotalLabel: String,
        TotalsectionFourItemsEn: Number,
        TotalsectionFourItemsDate2En: Number,
      },
      sectionFourSub: {
        sectionFourSubFirstLabelEn: String,
        sectionFourSubLabelsEn: { type: [String] },
        sectionFourSubNotesEn: { type: [String] },
        sectionFourSubItemsEn: { type: [String] },
        sectionFourSubItemsDate2En: { type: [String] },
        sectionFourSubTotalLabel: String,
        TotalsectionFourSubItemsEn: Number,
        TotalsectionFourSubItemsDate2En: Number,
      },

      sectionAttributeOne: {
        sectionFourAttribute: { type: String },
        sectionFourAttributeLabelsEn: { type: [String] },
        sectionFourAttributeItemsEn: { type: [String] },
        sectionFourAttributeItemsDate2En: { type: [String] },
        TotalsectionFourAttributeItemsEn: { type: Number },
        TotalsectionFourAttributeItemsDate2En: { type: Number },
      },

      sectionAttributeTwo: {
        sectionFourAttribute2: { type: String },
        sectionFourAttribute2LabelsEn: { type: [String] },
        sectionFourAttribute2ItemsEn: { type: [String] },
        sectionFourAttribute2ItemsDate2En: { type: [String] },
        TotalsectionFourAttribute2ItemsEn: { type: Number },
        TotalsectionFourAttribute2ItemsDate2En: { type: Number },
      },
      sectionOtherComprehensiveIncome: {
        sectionFourOtherComprehensiveIncome: { type: String },
        sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: {type:[String]},
        sectionFourOtherComprehensiveIncomeSubheadingNotesEn: { type: [String]},
        sectionFourOtherComprehensiveIncomeSubheadingItemsEn: { type: [String] },
        sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: { type: [String] },
      },
      Table2: {
        dateTwo1En: { type: Schema.Types.Mixed },
        dateTwo2En: { type: Schema.Types.Mixed },
          sectionOneTable2: {
          sectionLastLabel: { type: String },
          TotalsectionFourSubItemsEn: { type: Number },
          TotalsectionFourSubItemsDate2En: { type: Number },
          sectionSevenLastLabel: { type: String },
          sectionSevenSubheading: { type: String },
          sectionLastLabelsEn: { type: [String] },
          sectionLastNotesEn: { type: [String] },
          sectionLastItemsEn: { type: [String] },
          sectionLastItemsDate2En: { type: [String] },
          sectionLastTotalLabelEn: { type: String },
          TotalSectionLastLabelItemsEn: { type: Number },
          TotalSectionLastItemsDate2En: { type: Number },
        },
        sectionTwoTable2: {
          sectionSevenSubheading2: { type: String },
          sectionLastLabelsEn2: { type: [String] },
          sectionLastNotesEn2: { type: [String] },
          sectionLastItemsEn2: { type: [String] },
          sectionLastItemsDate2En2: { type: [String] },
          sectionLastTotalLabelEn2: { type: String },
          TotalSectionLastLabelItemsEn2: { type: Number },
          TotalSectionLastItemsDate2En2: { type: Number },
          totalOtherComp: {
            SectionSevenSecondLastLabel2: { type: String },
            TotalsectionSevenSecondLastItemEn: { type: Number },
            TotalsectionSevenSecondLastItemsDate2En: { type: Number },
          },
          totalComprehensiveLoss: {
            SectionSevenLastLabel2: { type: String },
            TotalsectionSevenLastItemEn: { type: Number },
            TotalsectionSevenLastItemsDate2En: { type: Number },
          },
        },

        sectionAttributeOneTable2: {
          sectionFourAttributeTable2: { type: String },
          sectionFourAttributeLabelsEnTable2: { type: [String] },
          sectionFourAttributeItemsEnTable2: { type: [String] },
          sectionFourAttributeItemsDate2EnTable2: { type: [String] },
          TotalsectionFourAttributeItemsEnTable2: { type: Number },
          TotalsectionFourAttributeItemsDate2EnTable2: { type: Number },
        },

        sectionAttributeTwoTable2: {
          sectionFourAttribute2Table2: { type: String },
          sectionFourAttribute2LabelsEnTable2: { type: [String] },
          sectionFourAttribute2ItemsEnTable2: { type: [String] },
          sectionFourAttribute2ItemsDate2EnTable2: { type: [String] },
          TotalsectionFourAttribute2ItemsEnTable2: { type: Number },
          TotalsectionFourAttribute2ItemsDate2EnTable2: { type: Number },
        },
        sectionOtherComprehensiveIncomeTable2: {
          sectionFourOtherComprehensiveIncomeTable2: { type: String },
          sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: {  type: [String],          },
          sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: {            type: [String],         },
          sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: {          type: [String],        },
          sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: {         type: [String],       },
        },
      },
    },
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
