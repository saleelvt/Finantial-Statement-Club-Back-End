"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAddTableController = void 0;
const documentSchema_1 = require("@/infrastructure/database/models/documentSchema");
const ArabicDocumentSchema_1 = require("@/infrastructure/database/models/ArabicDocumentSchema");
/**
 * Helper function to safely parse numeric values
 * @param value Value to parse
 * @returns Number or undefined
 */
const safeParseFloat = (value) => {
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
const ensureArray = (value) => {
    return Array.isArray(value) ? value : [];
};
const adminAddTableController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204, _205, _206, _207, _208, _209, _210, _211, _212, _213, _214, _215, _216, _217, _218, _219, _220, _221, _222, _223, _224, _225, _226, _227, _228, _229, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239, _240, _241, _242, _243, _244, _245, _246, _247, _248, _249, _250, _251, _252, _253, _254, _255, _256, _257, _258, _259, _260, _261, _262, _263, _264, _265, _266, _267, _268, _269, _270, _271, _272, _273, _274, _275, _276, _277, _278, _279, _280, _281, _282, _283, _284, _285, _286, _287, _288, _289, _290, _291, _292, _293, _294, _295, _296, _297, _298, _299, _300, _301, _302, _303, _304, _305, _306, _307, _308, _309, _310, _311, _312, _313, _314, _315, _316, _317, _318, _319, _320, _321, _322, _323, _324, _325, _326, _327, _328, _329, _330, _331, _332, _333, _334, _335, _336, _337, _338, _339, _340, _341, _342, _343, _344, _345, _346, _347, _348, _349, _350, _351, _352, _353, _354, _355, _356, _357, _358, _359, _360, _361, _362, _363, _364, _365, _366, _367, _368, _369, _370, _371, _372, _373, _374, _375, _376, _377, _378, _379, _380, _381, _382, _383, _384, _385, _386, _387, _388, _389, _390, _391, _392, _393, _394, _395, _396, _397, _398, _399, _400, _401, _402, _403, _404, _405, _406, _407, _408, _409, _410, _411, _412, _413, _414, _415, _416, _417, _418, _419, _420, _421, _422, _423, _424, _425, _426, _427, _428, _429, _430, _431, _432, _433, _434, _435, _436, _437, _438, _439, _440, _441, _442, _443, _444, _445, _446, _447, _448, _449, _450, _451, _452, _453, _454, _455, _456, _457, _458, _459, _460, _461, _462, _463, _464, _465, _466, _467, _468, _469, _470, _471, _472, _473, _474, _475, _476, _477, _478, _479, _480, _481, _482, _483, _484, _485, _486, _487, _488, _489, _490, _491, _492, _493, _494, _495, _496, _497, _498, _499, _500, _501, _502, _503, _504, _505, _506, _507, _508, _509, _510, _511, _512, _513, _514, _515, _516, _517, _518, _519, _520, _521, _522, _523, _524, _525, _526, _527, _528, _529, _530, _531, _532, _533, _534, _535, _536, _537, _538, _539, _540, _541, _542, _543;
        try {
            const { tadawalCode, selectedYear, quarterYear, selectedTableType, language, data, } = req.body;
            const year = selectedYear;
            const section = quarterYear;
            const category = selectedTableType;
            if (!tadawalCode || !year || !section || !category || !language) {
                return res
                    .status(400)
                    .json({ success: false, message: "Missing required fields." });
            }
            if (language === "English") {
                const existingDocuments = yield documentSchema_1.Document.find({ tadawalCode });
                // const existingDocuments = await DocumentModel.find({tadawalCode})
                if (existingDocuments.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "No documents found with the provided Tadawal code.",
                    });
                }
                // Check if section.year matches req.body.year
                const matchedDocument = existingDocuments.find((doc) => { var _a, _b; return ((_b = (_a = doc.formData) === null || _a === void 0 ? void 0 : _a[section]) === null || _b === void 0 ? void 0 : _b.year) === year; });
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
                                scurrentAssets: ((_b = (_a = data.assets) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.scurrentAssets) || "",
                                currentLabels: ensureArray((_d = (_c = data.assets) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.currentLabelsAr),
                                CurrentAssetsNotes: ensureArray((_f = (_e = data.assets) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.CurrentAssetsNotes),
                                items: ensureArray((_h = (_g = data.assets) === null || _g === void 0 ? void 0 : _g.current) === null || _h === void 0 ? void 0 : _h.items),
                                itemsDate2: ensureArray((_k = (_j = data.assets) === null || _j === void 0 ? void 0 : _j.current) === null || _k === void 0 ? void 0 : _k.itemsDate2),
                                subItems: ensureArray((_m = (_l = data.assets) === null || _l === void 0 ? void 0 : _l.current) === null || _m === void 0 ? void 0 : _m.subItems),
                                currentSubLabels: ensureArray((_p = (_o = data.assets) === null || _o === void 0 ? void 0 : _o.current) === null || _p === void 0 ? void 0 : _p.currentSubLabelsAr),
                                subItemsDate2: ensureArray((_r = (_q = data.assets) === null || _q === void 0 ? void 0 : _q.current) === null || _r === void 0 ? void 0 : _r.subItemsDate2),
                                firstTotal: safeParseFloat((_t = (_s = data.assets) === null || _s === void 0 ? void 0 : _s.current) === null || _t === void 0 ? void 0 : _t.firstTotal),
                                firstTotalDate2: safeParseFloat((_v = (_u = data.assets) === null || _u === void 0 ? void 0 : _u.current) === null || _v === void 0 ? void 0 : _v.firstTotalDate2),
                                secondTotal: safeParseFloat((_x = (_w = data.assets) === null || _w === void 0 ? void 0 : _w.current) === null || _x === void 0 ? void 0 : _x.secondTotal),
                                secondTotalDate2: safeParseFloat((_z = (_y = data.assets) === null || _y === void 0 ? void 0 : _y.current) === null || _z === void 0 ? void 0 : _z.secondTotalDate2),
                                sfirtsTotalCurrentAssets: ((_1 = (_0 = data.assets) === null || _0 === void 0 ? void 0 : _0.current) === null || _1 === void 0 ? void 0 : _1.sfirtsTotalCurrentAssets) || "",
                                stotalCurrentAssets: ((_3 = (_2 = data.assets) === null || _2 === void 0 ? void 0 : _2.current) === null || _3 === void 0 ? void 0 : _3.stotalCurrentAssets) || "",
                            },
                            nonCurrent: {
                                snonCurrentAssets: ((_5 = (_4 = data.assets) === null || _4 === void 0 ? void 0 : _4.nonCurrent) === null || _5 === void 0 ? void 0 : _5.snonCurrentAssets) || "",
                                nonCurrentLabels: ensureArray((_7 = (_6 = data.assets) === null || _6 === void 0 ? void 0 : _6.nonCurrent) === null || _7 === void 0 ? void 0 : _7.nonCurrentLabelsAr),
                                items: ensureArray((_9 = (_8 = data.assets) === null || _8 === void 0 ? void 0 : _8.nonCurrent) === null || _9 === void 0 ? void 0 : _9.items),
                                itemsDate2: ensureArray((_11 = (_10 = data.assets) === null || _10 === void 0 ? void 0 : _10.nonCurrent) === null || _11 === void 0 ? void 0 : _11.itemsDate2),
                                nonCurrentSubLabels: ensureArray((_13 = (_12 = data.assets) === null || _12 === void 0 ? void 0 : _12.nonCurrent) === null || _13 === void 0 ? void 0 : _13.nonCurrentSubLabelsAr),
                                subItems: ensureArray((_15 = (_14 = data.assets) === null || _14 === void 0 ? void 0 : _14.nonCurrent) === null || _15 === void 0 ? void 0 : _15.subItems),
                                subItemsDate2: ensureArray((_17 = (_16 = data.assets) === null || _16 === void 0 ? void 0 : _16.nonCurrent) === null || _17 === void 0 ? void 0 : _17.subItemsDate2),
                                firstTotal: safeParseFloat((_19 = (_18 = data.assets) === null || _18 === void 0 ? void 0 : _18.nonCurrent) === null || _19 === void 0 ? void 0 : _19.firstTotal),
                                firstTotalDate2: safeParseFloat((_21 = (_20 = data.assets) === null || _20 === void 0 ? void 0 : _20.nonCurrent) === null || _21 === void 0 ? void 0 : _21.firstTotalDate2),
                                secondTotal: safeParseFloat((_23 = (_22 = data.assets) === null || _22 === void 0 ? void 0 : _22.nonCurrent) === null || _23 === void 0 ? void 0 : _23.secondTotal),
                                secondTotalDate2: safeParseFloat((_25 = (_24 = data.assets) === null || _24 === void 0 ? void 0 : _24.nonCurrent) === null || _25 === void 0 ? void 0 : _25.secondTotalDate2),
                                sfirtsTotalnonCurrentAssets: ((_27 = (_26 = data.assets) === null || _26 === void 0 ? void 0 : _26.nonCurrent) === null || _27 === void 0 ? void 0 : _27.sfirtsTotalnonCurrentAssets) || "",
                                stotalNonCurrentAssets: ((_29 = (_28 = data.assets) === null || _28 === void 0 ? void 0 : _28.nonCurrent) === null || _29 === void 0 ? void 0 : _29.stotalNonCurrentAssets) || "",
                                nonCurrentNotes: ensureArray((_31 = (_30 = data.assets) === null || _30 === void 0 ? void 0 : _30.nonCurrent) === null || _31 === void 0 ? void 0 : _31.nonCurrentNotes),
                            },
                            sassets: ((_32 = data.assets) === null || _32 === void 0 ? void 0 : _32.sassets) || "",
                            stotalAssets: ((_33 = data.assets) === null || _33 === void 0 ? void 0 : _33.stotalAssets) || "",
                            totalAssets: safeParseFloat((_34 = data.assets) === null || _34 === void 0 ? void 0 : _34.totalAssets),
                            totalAssetsDate2: safeParseFloat((_35 = data.assets) === null || _35 === void 0 ? void 0 : _35.totalAssetsDate2),
                        },
                        // Additional data fields
                        data1En: data.data1En || null,
                        data2En: data.data2En || null,
                        // Equity section
                        equity: {
                            sShareholdersEquity: ((_36 = data.equity) === null || _36 === void 0 ? void 0 : _36.sShareholdersEquity) || "",
                            equityLabels: ensureArray((_37 = data.equity) === null || _37 === void 0 ? void 0 : _37.equityLabelsAr),
                            items: ensureArray((_38 = data.equity) === null || _38 === void 0 ? void 0 : _38.items),
                            itemsDate2: ensureArray((_39 = data.equity) === null || _39 === void 0 ? void 0 : _39.itemsDate2),
                            equitySubLabels: ensureArray((_40 = data.equity) === null || _40 === void 0 ? void 0 : _40.equitySubLabelsAr),
                            subItems: ensureArray((_41 = data.equity) === null || _41 === void 0 ? void 0 : _41.subItems),
                            subItemsDate2: ensureArray((_42 = data.equity) === null || _42 === void 0 ? void 0 : _42.subItemsDate2),
                            firstTotal: safeParseFloat((_43 = data.equity) === null || _43 === void 0 ? void 0 : _43.firstTotal),
                            firstTotalDate2: safeParseFloat((_44 = data.equity) === null || _44 === void 0 ? void 0 : _44.firstTotalDate2),
                            sfirtsTotalShareholdersEquity: ((_45 = data.equity) === null || _45 === void 0 ? void 0 : _45.sfirtsTotalShareholdersEquity) || "",
                            stotalShareholdersEquity: ((_46 = data.equity) === null || _46 === void 0 ? void 0 : _46.stotalShareholdersEquity) || "",
                            totalEquity: safeParseFloat((_47 = data.equity) === null || _47 === void 0 ? void 0 : _47.totalEquity),
                            totalEquityDate2: safeParseFloat((_48 = data.equity) === null || _48 === void 0 ? void 0 : _48.totalEquityDate2),
                            equityItemsNotes: ensureArray((_49 = data.equity) === null || _49 === void 0 ? void 0 : _49.equityItemsNotes),
                        },
                        // Liabilities section
                        liabilities: {
                            liabilities: ((_50 = data.liabilities) === null || _50 === void 0 ? void 0 : _50.liabilities) || "",
                            current: {
                                scurrentliabilities: ((_52 = (_51 = data.liabilities) === null || _51 === void 0 ? void 0 : _51.current) === null || _52 === void 0 ? void 0 : _52.scurrentliabilities) || "",
                                currentLiabilitiesLabels: ensureArray((_54 = (_53 = data.liabilities) === null || _53 === void 0 ? void 0 : _53.current) === null || _54 === void 0 ? void 0 : _54.currentLiabilitiesLabelsAr),
                                currentLiabilitiesSubLabels: ensureArray((_56 = (_55 = data.liabilities) === null || _55 === void 0 ? void 0 : _55.current) === null || _56 === void 0 ? void 0 : _56.currentSubLiabilitiesLabelsAr),
                                items: ensureArray((_58 = (_57 = data.liabilities) === null || _57 === void 0 ? void 0 : _57.current) === null || _58 === void 0 ? void 0 : _58.items),
                                itemsDate2: ensureArray((_60 = (_59 = data.liabilities) === null || _59 === void 0 ? void 0 : _59.current) === null || _60 === void 0 ? void 0 : _60.itemsDate2),
                                subItems: ensureArray((_62 = (_61 = data.liabilities) === null || _61 === void 0 ? void 0 : _61.current) === null || _62 === void 0 ? void 0 : _62.subItems),
                                subItemsDate2: ensureArray((_64 = (_63 = data.liabilities) === null || _63 === void 0 ? void 0 : _63.current) === null || _64 === void 0 ? void 0 : _64.subItemsDate2),
                                firstTotal: safeParseFloat((_66 = (_65 = data.liabilities) === null || _65 === void 0 ? void 0 : _65.current) === null || _66 === void 0 ? void 0 : _66.firstTotal),
                                firstTotalDate2: safeParseFloat((_68 = (_67 = data.liabilities) === null || _67 === void 0 ? void 0 : _67.current) === null || _68 === void 0 ? void 0 : _68.firstTotalDate2),
                                sfirtsTotalcurrentLiabilities: ((_70 = (_69 = data.liabilities) === null || _69 === void 0 ? void 0 : _69.current) === null || _70 === void 0 ? void 0 : _70.sfirtsTotalcurrentLiabilities) ||
                                    "",
                                stotalcurrentliabilities: ((_72 = (_71 = data.liabilities) === null || _71 === void 0 ? void 0 : _71.current) === null || _72 === void 0 ? void 0 : _72.stotalcurrentliabilities) || "",
                                total: safeParseFloat((_74 = (_73 = data.liabilities) === null || _73 === void 0 ? void 0 : _73.current) === null || _74 === void 0 ? void 0 : _74.total),
                                totalDate2: safeParseFloat((_76 = (_75 = data.liabilities) === null || _75 === void 0 ? void 0 : _75.current) === null || _76 === void 0 ? void 0 : _76.totalDate2),
                                currentLiabilitiesNotes: ensureArray((_78 = (_77 = data.liabilities) === null || _77 === void 0 ? void 0 : _77.current) === null || _78 === void 0 ? void 0 : _78.currentLiabilitiesNotes),
                            },
                            nonCurrent: {
                                sNoncurrentliabilities: ((_80 = (_79 = data.liabilities) === null || _79 === void 0 ? void 0 : _79.nonCurrent) === null || _80 === void 0 ? void 0 : _80.sNoncurrentliabilities) || "",
                                NonCurrentLiabilitiesLabels: ensureArray((_82 = (_81 = data.liabilities) === null || _81 === void 0 ? void 0 : _81.nonCurrent) === null || _82 === void 0 ? void 0 : _82.nonCurrentLiabilitiesLabelsAr),
                                items: ensureArray((_84 = (_83 = data.liabilities) === null || _83 === void 0 ? void 0 : _83.nonCurrent) === null || _84 === void 0 ? void 0 : _84.items),
                                itemsDate2: ensureArray((_86 = (_85 = data.liabilities) === null || _85 === void 0 ? void 0 : _85.nonCurrent) === null || _86 === void 0 ? void 0 : _86.itemsDate2),
                                NonCurrentLiabilitiesSubLabels: ensureArray((_88 = (_87 = data.liabilities) === null || _87 === void 0 ? void 0 : _87.nonCurrent) === null || _88 === void 0 ? void 0 : _88.nonCurrentSubLiabilitiesLabelsAr),
                                subItems: ensureArray((_90 = (_89 = data.liabilities) === null || _89 === void 0 ? void 0 : _89.nonCurrent) === null || _90 === void 0 ? void 0 : _90.subItems),
                                subItemsDate2: ensureArray((_92 = (_91 = data.liabilities) === null || _91 === void 0 ? void 0 : _91.nonCurrent) === null || _92 === void 0 ? void 0 : _92.subItemsDate2),
                                firstTotal: safeParseFloat((_94 = (_93 = data.liabilities) === null || _93 === void 0 ? void 0 : _93.nonCurrent) === null || _94 === void 0 ? void 0 : _94.firstTotal),
                                firstTotalDate2: safeParseFloat((_96 = (_95 = data.liabilities) === null || _95 === void 0 ? void 0 : _95.nonCurrent) === null || _96 === void 0 ? void 0 : _96.firstTotalDate2),
                                sfirtsTotalNoncurrentLiabilities: ((_98 = (_97 = data.liabilities) === null || _97 === void 0 ? void 0 : _97.nonCurrent) === null || _98 === void 0 ? void 0 : _98.sfirtsTotalNoncurrentLiabilities) || "",
                                stotalNoncurrentliabilities: ((_100 = (_99 = data.liabilities) === null || _99 === void 0 ? void 0 : _99.nonCurrent) === null || _100 === void 0 ? void 0 : _100.stotalNoncurrentliabilities) ||
                                    "",
                                total: safeParseFloat((_102 = (_101 = data.liabilities) === null || _101 === void 0 ? void 0 : _101.nonCurrent) === null || _102 === void 0 ? void 0 : _102.total),
                                totalDate2: safeParseFloat((_104 = (_103 = data.liabilities) === null || _103 === void 0 ? void 0 : _103.nonCurrent) === null || _104 === void 0 ? void 0 : _104.totalDate2),
                                nonCurrentLiabilitiesNotes: ensureArray((_106 = (_105 = data.liabilities) === null || _105 === void 0 ? void 0 : _105.nonCurrent) === null || _106 === void 0 ? void 0 : _106.nonCurrentLiabilitiesNotes),
                            },
                            stotalliabilities: ((_107 = data.liabilities) === null || _107 === void 0 ? void 0 : _107.stotalliabilities) || "",
                            totalLiabilities: safeParseFloat((_108 = data.liabilities) === null || _108 === void 0 ? void 0 : _108.totalLiabilities),
                            totalLiabilitiesDate2: safeParseFloat((_109 = data.liabilities) === null || _109 === void 0 ? void 0 : _109.totalLiabilitiesDate2),
                        },
                        // Section headings and totals
                        sShareholdersEquityandliabilitiess: (data === null || data === void 0 ? void 0 : data.sShareholdersEquityandliabilitiess) || "",
                        stotalEquityAndLiabilities: (data === null || data === void 0 ? void 0 : data.stotalEquityAndLiabilities) || "",
                        // Total values at the balance sheet level
                        ItotalEquityAndLiabilities: safeParseFloat(data === null || data === void 0 ? void 0 : data.ItotalEquityAndLiabilities),
                        ItotalEquityAndLiabilitiesDate2: safeParseFloat(data === null || data === void 0 ? void 0 : data.ItotalEquityAndLiabilitiesDate2),
                    };
                    // Update the BalanceSheet data in the document
                    matchedDocument.formData[section].table.BalanceSheet =
                        balanceSheetData;
                    // Save the updated document with error handling
                    try {
                        yield matchedDocument.save();
                        return res.status(200).json({
                            success: true,
                            message: "Balance sheet data saved successfully.",
                            Tabledata: matchedDocument.formData[section].table.BalanceSheet,
                        });
                    }
                    catch (saveError) {
                        console.error("Error saving document:", saveError);
                        return res.status(500).json({
                            success: false,
                            message: "Error saving document",
                            error: saveError.message,
                        });
                    }
                }
                else if (category === "CashFlow" && data) {
                    console.log("this is the cashflow object : English Back-end ", data);
                    const CashFlowData = {
                        date1En: data.date1,
                        date2En: data.date2,
                        sectionOne: {
                            sectionOneFirstLabelEn: ((_110 = data.sectionOne) === null || _110 === void 0 ? void 0 : _110.sectionOneFirstLabelEn) || "",
                            sectionOneLabelsEn: ensureArray((_111 = data.sectionOne) === null || _111 === void 0 ? void 0 : _111.sectionOneLabelsEn),
                            sectionOneNotesEn: ensureArray((_112 = data.sectionOne) === null || _112 === void 0 ? void 0 : _112.sectionOneNotesEn),
                            sectionOneItemsEn: ensureArray((_113 = data.sectionOne) === null || _113 === void 0 ? void 0 : _113.sectionOneItemsEn),
                            sectionOneItemsDate2En: ensureArray((_114 = data.sectionOne) === null || _114 === void 0 ? void 0 : _114.sectionOneItemsDate2En),
                            sectionOneTotalLabel: ((_115 = data.sectionOne) === null || _115 === void 0 ? void 0 : _115.sectionOneTotalLabel) || "",
                            TotalsectionOneItemsEn: safeParseFloat((_116 = data.sectionOne) === null || _116 === void 0 ? void 0 : _116.TotalsectionOneItemsEn),
                            TotalsectionOneItemsDate2En: safeParseFloat((_117 = data.sectionOne) === null || _117 === void 0 ? void 0 : _117.TotalsectionOneItemsDate2En),
                        },
                        sectionTwo: {
                            sectionTwoLabelsEn: ensureArray((_118 = data.sectionTwo) === null || _118 === void 0 ? void 0 : _118.sectionTwoLabelsEn),
                            sectionTwoNotesEn: ensureArray((_119 = data.sectionTwo) === null || _119 === void 0 ? void 0 : _119.sectionTwoNotesEn),
                            sectionTwoItemsEn: ensureArray((_120 = data.sectionTwo) === null || _120 === void 0 ? void 0 : _120.sectionTwoItemsEn),
                            sectionTwoItemsDate2En: ensureArray((_121 = data.sectionTwo) === null || _121 === void 0 ? void 0 : _121.sectionTwoItemsDate2En),
                            sectionTwoTotalLabel: ((_122 = data.sectionTwo) === null || _122 === void 0 ? void 0 : _122.sectionTwoTotalLabel) || "",
                            TotalsectionTwoItemsEn: safeParseFloat((_123 = data.sectionTwo) === null || _123 === void 0 ? void 0 : _123.TotalsectionTwoItemsEn),
                            TotalsectionTwoItemsDate2En: safeParseFloat((_124 = data.sectionTwo) === null || _124 === void 0 ? void 0 : _124.TotalsectionTwoItemsDate2En),
                        },
                        sectionThree: {
                            sectionThreeLabelsEn: ensureArray((_125 = data.sectionThree) === null || _125 === void 0 ? void 0 : _125.sectionThreeLabelsEn),
                            sectionThreeNotesEn: ensureArray((_126 = data.sectionThree) === null || _126 === void 0 ? void 0 : _126.sectionThreeNotesEn),
                            sectionThreeItemsEn: ensureArray((_127 = data.sectionThree) === null || _127 === void 0 ? void 0 : _127.sectionThreeItemsEn),
                            sectionThreeItemsDate2En: ensureArray((_128 = data.sectionThree) === null || _128 === void 0 ? void 0 : _128.sectionThreeItemsDate2En),
                            sectionThreeTotalLabel: ((_129 = data.sectionThree) === null || _129 === void 0 ? void 0 : _129.sectionThreeTotalLabel) || "",
                            TotalsectionThreeItemsEn: safeParseFloat((_130 = data.sectionThree) === null || _130 === void 0 ? void 0 : _130.TotalsectionThreeItemsEn),
                            TotalsectionThreeItemsDate2En: safeParseFloat((_131 = data.sectionThree) === null || _131 === void 0 ? void 0 : _131.TotalsectionThreeItemsDate2En),
                        },
                        sectionFour: {
                            sectionFourLabelsEn: ensureArray((_132 = data.sectionFour) === null || _132 === void 0 ? void 0 : _132.sectionFourLabelsEn),
                            sectionFourNotesEn: ensureArray((_133 = data.sectionFour) === null || _133 === void 0 ? void 0 : _133.sectionFourNotesEn),
                            sectionFourItemsEn: ensureArray((_134 = data.sectionFour) === null || _134 === void 0 ? void 0 : _134.sectionFourItemsEn),
                            sectionFourItemsDate2En: ensureArray((_135 = data.sectionFour) === null || _135 === void 0 ? void 0 : _135.sectionFourItemsDate2En),
                            sectionFourTotalLabel: ((_136 = data.sectionFour) === null || _136 === void 0 ? void 0 : _136.sectionFourTotalLabel) || "",
                            TotalsectionFourItemsEn: safeParseFloat((_137 = data.sectionFour) === null || _137 === void 0 ? void 0 : _137.TotalsectionFourItemsEn),
                            TotalsectionFourItemsDate2En: safeParseFloat((_138 = data.sectionFour) === null || _138 === void 0 ? void 0 : _138.TotalsectionFourItemsDate2En),
                        },
                        sectionFourSub: {
                            sectionFourSubFirstLabelEn: ((_139 = data.sectionFour) === null || _139 === void 0 ? void 0 : _139.sectionFourSubFirstLabelEn) || "",
                            sectionFourSubLabelsEn: ensureArray((_140 = data.sectionFour) === null || _140 === void 0 ? void 0 : _140.sectionFourSubLabelsEn),
                            sectionFourSubNotesEn: ensureArray((_141 = data.sectionFour) === null || _141 === void 0 ? void 0 : _141.sectionFourSubNotesEn),
                            sectionFourSubItemsEn: ensureArray((_142 = data.sectionFour) === null || _142 === void 0 ? void 0 : _142.sectionFourSubItemsEn),
                            sectionFourSubItemsDate2En: ensureArray((_143 = data.sectionFour) === null || _143 === void 0 ? void 0 : _143.sectionFourSubItemsDate2En),
                            sectionFourSubTotalLabel: ((_144 = data.sectionFour) === null || _144 === void 0 ? void 0 : _144.sectionFourSubTotalLabel) || "",
                            TotalsectionFourSubItemsEn: safeParseFloat((_145 = data.sectionFour) === null || _145 === void 0 ? void 0 : _145.TotalsectionFourSubItemsEn),
                            TotalsectionFourSubItemsDate2En: safeParseFloat((_146 = data.sectionFour) === null || _146 === void 0 ? void 0 : _146.TotalsectionFourSubItemsDate2En),
                        },
                        sectionAttributeOne: {
                            sectionFourAttribute: ((_147 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _147 === void 0 ? void 0 : _147.sectionFourAttribute) || "",
                            sectionFourAttributeLabelsEn: ensureArray((_148 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _148 === void 0 ? void 0 : _148.sectionFourAttributeLabelsEn),
                            sectionFourAttributeItemsEn: ensureArray((_149 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _149 === void 0 ? void 0 : _149.sectionFourAttributeItemsEn),
                            sectionFourAttributeItemsDate2En: ensureArray((_150 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _150 === void 0 ? void 0 : _150.sectionFourAttributeItemsDate2En),
                            TotalsectionFourAttributeItemsEn: safeParseFloat((_151 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _151 === void 0 ? void 0 : _151.TotalsectionFourAttributeItemsEn),
                            TotalsectionFourAttributeItemsDate2En: safeParseFloat((_152 = data === null || data === void 0 ? void 0 : data.sectionAttributeOne) === null || _152 === void 0 ? void 0 : _152.TotalsectionFourAttributeItemsDate2En),
                        },
                        sectionAttributeTwo: {
                            sectionFourAttribute2: ((_153 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _153 === void 0 ? void 0 : _153.sectionFourAttribute2) || "",
                            sectionFourAttribute2LabelsEn: ensureArray((_154 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _154 === void 0 ? void 0 : _154.sectionFourAttribute2LabelsEn),
                            sectionFourAttribute2ItemsEn: ensureArray((_155 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _155 === void 0 ? void 0 : _155.sectionFourAttribute2ItemsEn),
                            sectionFourAttribute2ItemsDate2En: ensureArray((_156 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _156 === void 0 ? void 0 : _156.sectionFourAttribute2ItemsDate2En),
                            TotalsectionFourAttribute2ItemsEn: safeParseFloat((_157 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _157 === void 0 ? void 0 : _157.TotalsectionFourAttribute2ItemsEn),
                            TotalsectionFourAttribute2ItemsDate2En: safeParseFloat((_158 = data === null || data === void 0 ? void 0 : data.sectionAttributeTwo) === null || _158 === void 0 ? void 0 : _158.TotalsectionFourAttribute2ItemsDate2En),
                        },
                        sectionOtherComprehensiveIncome: {
                            sectionFourOtherComprehensiveIncome: ((_159 = data === null || data === void 0 ? void 0 : data.sectionOtherComprehensiveIncome) === null || _159 === void 0 ? void 0 : _159.sectionFourOtherComprehensiveIncome) || "",
                            sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray((_160 = data === null || data === void 0 ? void 0 : data.sectionOtherComprehensiveIncome) === null || _160 === void 0 ? void 0 : _160.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
                            sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray((_161 = data === null || data === void 0 ? void 0 : data.sectionOtherComprehensiveIncome) === null || _161 === void 0 ? void 0 : _161.sectionFourOtherComprehensiveIncomeSubheadingNotesEn),
                            sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray((_162 = data === null || data === void 0 ? void 0 : data.sectionOtherComprehensiveIncome) === null || _162 === void 0 ? void 0 : _162.sectionFourOtherComprehensiveIncomeSubheadingItemsEn),
                            sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray((_163 = data === null || data === void 0 ? void 0 : data.sectionOtherComprehensiveIncome) === null || _163 === void 0 ? void 0 : _163.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
                        },
                        Table2: {
                            dateTwo1En: (_164 = data.Table2) === null || _164 === void 0 ? void 0 : _164.dateTwo1En,
                            dateTwo2En: (_165 = data.Table2) === null || _165 === void 0 ? void 0 : _165.dateTwo2En,
                            sectionOneTable2: {
                                sectionLastLabel: ((_167 = (_166 = data.Table2) === null || _166 === void 0 ? void 0 : _166.sectionOneTable2) === null || _167 === void 0 ? void 0 : _167.sectionLastLabel) || "",
                                TotalsectionFourSubItemsEn: safeParseFloat((_169 = (_168 = data.Table2) === null || _168 === void 0 ? void 0 : _168.sectionOneTable2) === null || _169 === void 0 ? void 0 : _169.TotalsectionFourSubItemsEn),
                                TotalsectionFourSubItemsDate2En: safeParseFloat((_171 = (_170 = data.Table2) === null || _170 === void 0 ? void 0 : _170.sectionOneTable2) === null || _171 === void 0 ? void 0 : _171.TotalsectionFourSubItemsDate2En),
                                sectionSevenLastLabel: ((_173 = (_172 = data.Table2) === null || _172 === void 0 ? void 0 : _172.sectionOneTable2) === null || _173 === void 0 ? void 0 : _173.sectionSevenLastLabel) || "",
                                sectionSevenSubheading: ((_175 = (_174 = data.Table2) === null || _174 === void 0 ? void 0 : _174.sectionOneTable2) === null || _175 === void 0 ? void 0 : _175.sectionSevenSubheading) || "",
                                sectionLastLabelsEn: ensureArray((_177 = (_176 = data.Table2) === null || _176 === void 0 ? void 0 : _176.sectionOneTable2) === null || _177 === void 0 ? void 0 : _177.sectionLastLabelsEn),
                                sectionLastNotesEn: ensureArray((_179 = (_178 = data.Table2) === null || _178 === void 0 ? void 0 : _178.sectionOneTable2) === null || _179 === void 0 ? void 0 : _179.sectionLastNotesEn),
                                sectionLastItemsEn: ensureArray((_181 = (_180 = data.Table2) === null || _180 === void 0 ? void 0 : _180.sectionOneTable2) === null || _181 === void 0 ? void 0 : _181.sectionLastItemsEn),
                                sectionLastItemsDate2En: ensureArray((_183 = (_182 = data.Table2) === null || _182 === void 0 ? void 0 : _182.sectionOneTable2) === null || _183 === void 0 ? void 0 : _183.sectionLastItemsDate2En),
                                sectionLastTotalLabelEn: ((_185 = (_184 = data.Table2) === null || _184 === void 0 ? void 0 : _184.sectionOneTable2) === null || _185 === void 0 ? void 0 : _185.sectionLastTotalLabelEn) || "",
                                TotalSectionLastLabelItemsEn: safeParseFloat((_187 = (_186 = data.Table2) === null || _186 === void 0 ? void 0 : _186.sectionOneTable2) === null || _187 === void 0 ? void 0 : _187.TotalSectionLastLabelItemsEn),
                                TotalSectionLastItemsDate2En: safeParseFloat((_189 = (_188 = data.Table2) === null || _188 === void 0 ? void 0 : _188.sectionOneTable2) === null || _189 === void 0 ? void 0 : _189.TotalSectionLastItemsDate2En),
                            },
                            sectionTwoTable2: {
                                sectionSevenSubheading2: ((_191 = (_190 = data.Table2) === null || _190 === void 0 ? void 0 : _190.sectionTwoTable2) === null || _191 === void 0 ? void 0 : _191.sectionSevenSubheading2) || "",
                                sectionLastLabelsEn2: ensureArray((_193 = (_192 = data.Table2) === null || _192 === void 0 ? void 0 : _192.sectionTwoTable2) === null || _193 === void 0 ? void 0 : _193.sectionLastLabelsEn2),
                                sectionLastNotesEn2: ensureArray((_195 = (_194 = data.Table2) === null || _194 === void 0 ? void 0 : _194.sectionTwoTable2) === null || _195 === void 0 ? void 0 : _195.sectionLastNotesEn2),
                                sectionLastItemsEn2: ensureArray((_197 = (_196 = data.Table2) === null || _196 === void 0 ? void 0 : _196.sectionTwoTable2) === null || _197 === void 0 ? void 0 : _197.sectionLastItemsEn2),
                                sectionLastItemsDate2En2: ensureArray((_199 = (_198 = data.Table2) === null || _198 === void 0 ? void 0 : _198.sectionTwoTable2) === null || _199 === void 0 ? void 0 : _199.sectionLastItemsDate2En2),
                                sectionLastTotalLabelEn2: ((_201 = (_200 = data.Table2) === null || _200 === void 0 ? void 0 : _200.sectionTwoTable2) === null || _201 === void 0 ? void 0 : _201.sectionLastTotalLabelEn2) || "",
                                TotalSectionLastLabelItemsEn2: safeParseFloat((_203 = (_202 = data.Table2) === null || _202 === void 0 ? void 0 : _202.sectionTwoTable2) === null || _203 === void 0 ? void 0 : _203.TotalSectionLastLabelItemsEn2),
                                TotalSectionLastItemsDate2En2: safeParseFloat((_205 = (_204 = data.Table2) === null || _204 === void 0 ? void 0 : _204.sectionTwoTable2) === null || _205 === void 0 ? void 0 : _205.TotalSectionLastItemsDate2En2),
                                totalOtherComp: {
                                    SectionSevenSecondLastLabel2: ((_208 = (_207 = (_206 = data.Table2) === null || _206 === void 0 ? void 0 : _206.sectionTwoTable2) === null || _207 === void 0 ? void 0 : _207.totalOtherComp) === null || _208 === void 0 ? void 0 : _208.SectionSevenSecondLastLabel2) || "",
                                    TotalsectionSevenSecondLastItemEn: safeParseFloat((_211 = (_210 = (_209 = data.Table2) === null || _209 === void 0 ? void 0 : _209.sectionTwoTable2) === null || _210 === void 0 ? void 0 : _210.totalOtherComp) === null || _211 === void 0 ? void 0 : _211.TotalsectionSevenSecondLastItemEn),
                                    TotalsectionSevenSecondLastItemsDate2En: safeParseFloat((_214 = (_213 = (_212 = data.Table2) === null || _212 === void 0 ? void 0 : _212.sectionTwoTable2) === null || _213 === void 0 ? void 0 : _213.totalOtherComp) === null || _214 === void 0 ? void 0 : _214.TotalsectionSevenSecondLastItemsDate2En),
                                },
                                totalComprehensiveLoss: {
                                    SectionSevenLastLabel2: ((_217 = (_216 = (_215 = data.Table2) === null || _215 === void 0 ? void 0 : _215.sectionTwoTable2) === null || _216 === void 0 ? void 0 : _216.totalComprehensiveLoss) === null || _217 === void 0 ? void 0 : _217.SectionSevenLastLabel2) || "",
                                    TotalsectionSevenLastItemEn: safeParseFloat((_220 = (_219 = (_218 = data.Table2) === null || _218 === void 0 ? void 0 : _218.sectionTwoTable2) === null || _219 === void 0 ? void 0 : _219.totalComprehensiveLoss) === null || _220 === void 0 ? void 0 : _220.TotalsectionSevenLastItemEn),
                                    TotalsectionSevenLastItemsDate2En: safeParseFloat((_223 = (_222 = (_221 = data.Table2) === null || _221 === void 0 ? void 0 : _221.sectionTwoTable2) === null || _222 === void 0 ? void 0 : _222.totalComprehensiveLoss) === null || _223 === void 0 ? void 0 : _223.TotalsectionSevenLastItemsDate2En),
                                },
                            },
                            sectionAttributeOneTable2: {
                                sectionFourAttributeTable2: ((_225 = (_224 = data.Table2) === null || _224 === void 0 ? void 0 : _224.sectionAttributeOneTable2) === null || _225 === void 0 ? void 0 : _225.sectionFourAttributeTable2) || "",
                                sectionFourAttributeLabelsEnTable2: ensureArray((_227 = (_226 = data.Table2) === null || _226 === void 0 ? void 0 : _226.sectionAttributeOneTable2) === null || _227 === void 0 ? void 0 : _227.sectionFourAttributeLabelsEnTable2),
                                sectionFourAttributeItemsEnTable2: ensureArray((_229 = (_228 = data.Table2) === null || _228 === void 0 ? void 0 : _228.sectionAttributeOneTable2) === null || _229 === void 0 ? void 0 : _229.sectionFourAttributeItemsEnTable2),
                                sectionFourAttributeItemsDate2EnTable2: ensureArray((_231 = (_230 = data.Table2) === null || _230 === void 0 ? void 0 : _230.sectionAttributeOneTable2) === null || _231 === void 0 ? void 0 : _231.sectionFourAttributeItemsDate2EnTable2),
                                TotalsectionFourAttributeItemsEnTable2: safeParseFloat((_233 = (_232 = data.Table2) === null || _232 === void 0 ? void 0 : _232.sectionAttributeOneTable2) === null || _233 === void 0 ? void 0 : _233.TotalsectionFourAttributeItemsEnTable2),
                                TotalsectionFourAttributeItemsDate2EnTable2: safeParseFloat((_235 = (_234 = data.Table2) === null || _234 === void 0 ? void 0 : _234.sectionAttributeOneTable2) === null || _235 === void 0 ? void 0 : _235.TotalsectionFourAttributeItemsDate2EnTable2),
                            },
                            sectionAttributeTwoTable2: {
                                sectionFourAttribute2Table2: ((_237 = (_236 = data.Table2) === null || _236 === void 0 ? void 0 : _236.sectionAttributeTwoTable2) === null || _237 === void 0 ? void 0 : _237.sectionFourAttribute2Table2) || "",
                                sectionFourAttribute2LabelsEnTable2: ensureArray((_239 = (_238 = data.Table2) === null || _238 === void 0 ? void 0 : _238.sectionAttributeTwoTable2) === null || _239 === void 0 ? void 0 : _239.sectionFourAttribute2LabelsEnTable2),
                                sectionFourAttribute2ItemsEnTable2: ensureArray((_241 = (_240 = data.Table2) === null || _240 === void 0 ? void 0 : _240.sectionAttributeTwoTable2) === null || _241 === void 0 ? void 0 : _241.sectionFourAttribute2ItemsEnTable2),
                                sectionFourAttribute2ItemsDate2EnTable2: ensureArray((_243 = (_242 = data.Table2) === null || _242 === void 0 ? void 0 : _242.sectionAttributeTwoTable2) === null || _243 === void 0 ? void 0 : _243.sectionFourAttribute2ItemsDate2EnTable2),
                                TotalsectionFourAttribute2ItemsEnTable2: safeParseFloat((_245 = (_244 = data.Table2) === null || _244 === void 0 ? void 0 : _244.sectionAttributeTwoTable2) === null || _245 === void 0 ? void 0 : _245.TotalsectionFourAttribute2ItemsEnTable2),
                                TotalsectionFourAttribute2ItemsDate2EnTable2: safeParseFloat((_247 = (_246 = data.Table2) === null || _246 === void 0 ? void 0 : _246.sectionAttributeTwoTable2) === null || _247 === void 0 ? void 0 : _247.TotalsectionFourAttribute2ItemsDate2EnTable2),
                            },
                            sectionOtherComprehensiveIncomeTable2: {
                                sectionFourOtherComprehensiveIncomeTable2: ((_249 = (_248 = data.Table2) === null || _248 === void 0 ? void 0 : _248.sectionOtherComprehensiveIncomeTable2) === null || _249 === void 0 ? void 0 : _249.sectionFourOtherComprehensiveIncomeTable2) || "",
                                sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: ensureArray((_251 = (_250 = data.Table2) === null || _250 === void 0 ? void 0 : _250.sectionOtherComprehensiveIncomeTable2) === null || _251 === void 0 ? void 0 : _251.sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2),
                                sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: ensureArray((_253 = (_252 = data.Table2) === null || _252 === void 0 ? void 0 : _252.sectionOtherComprehensiveIncomeTable2) === null || _253 === void 0 ? void 0 : _253.sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2),
                                sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: ensureArray((_255 = (_254 = data.Table2) === null || _254 === void 0 ? void 0 : _254.sectionOtherComprehensiveIncomeTable2) === null || _255 === void 0 ? void 0 : _255.sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2),
                                sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: ensureArray((_257 = (_256 = data.Table2) === null || _256 === void 0 ? void 0 : _256.sectionOtherComprehensiveIncomeTable2) === null || _257 === void 0 ? void 0 : _257.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2),
                            },
                        },
                    };
                    // Assign the data
                    matchedDocument.formData[section].table.CashFlow = CashFlowData;
                    try {
                        yield matchedDocument.save();
                        return res.status(200).json({
                            success: true,
                            message: "Cash Flow data English saved successfully.",
                            Tabledata: matchedDocument.formData[section].table.CashFlow,
                        });
                    }
                    catch (saveError) {
                        console.error("Error saving document:", saveError);
                        return res.status(500).json({
                            success: false,
                            message: "Error saving document",
                            error: saveError.message,
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid table category or missing data.",
                    });
                }
            }
            else if (language === "Arabic") {
                const existingDocuments = yield ArabicDocumentSchema_1.ArabicDocument.find({ tadawalCode });
                console.log("the back-end Arabic doc finded : ", existingDocuments);
                // const existingDocuments = await DocumentModel.find({tadawalCode})
                if (existingDocuments.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "No documents found with the provided Tadawal code.",
                    });
                }
                // Check if section.year matches req.body.year
                const matchedDocument = existingDocuments.find((doc) => { var _a, _b; return ((_b = (_a = doc.formData) === null || _a === void 0 ? void 0 : _a[section]) === null || _b === void 0 ? void 0 : _b.year) === year; });
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
                    console.log("this I Exprected balance sheet data of the data : ", data);
                    // Create the BalanceSheet object according to schema structure
                    const balanceSheetData = {
                        assets: {
                            sassets: ((_258 = data.qassets) === null || _258 === void 0 ? void 0 : _258.qsassets) || "",
                            current: {
                                scurrentAssets: ((_260 = (_259 = data.qassets) === null || _259 === void 0 ? void 0 : _259.qcurrent) === null || _260 === void 0 ? void 0 : _260.qscurrentAssets) || "",
                                currentLabels: ensureArray((_262 = (_261 = data.qassets) === null || _261 === void 0 ? void 0 : _261.qcurrent) === null || _262 === void 0 ? void 0 : _262.qcurrentLabelsAr), // Fixed: was currentLabelsAr
                                CurrentAssetsNotes: ensureArray((_264 = (_263 = data.qassets) === null || _263 === void 0 ? void 0 : _263.qcurrent) === null || _264 === void 0 ? void 0 : _264.qCurrentAssetsNotes),
                                items: ensureArray((_266 = (_265 = data.qassets) === null || _265 === void 0 ? void 0 : _265.qcurrent) === null || _266 === void 0 ? void 0 : _266.qitems),
                                itemsDate2: ensureArray((_268 = (_267 = data.qassets) === null || _267 === void 0 ? void 0 : _267.qcurrent) === null || _268 === void 0 ? void 0 : _268.qitemsDate2),
                                subItems: ensureArray((_270 = (_269 = data.qassets) === null || _269 === void 0 ? void 0 : _269.qcurrent) === null || _270 === void 0 ? void 0 : _270.qsubItems),
                                currentSubLabels: ensureArray((_272 = (_271 = data.qassets) === null || _271 === void 0 ? void 0 : _271.qcurrent) === null || _272 === void 0 ? void 0 : _272.qcurrentSubLabelsAr), // Fixed: was currentSubLabelsAr
                                subItemsDate2: ensureArray((_274 = (_273 = data.qassets) === null || _273 === void 0 ? void 0 : _273.qcurrent) === null || _274 === void 0 ? void 0 : _274.qsubItemsDate2),
                                firstTotal: safeParseFloat((_276 = (_275 = data.qassets) === null || _275 === void 0 ? void 0 : _275.qcurrent) === null || _276 === void 0 ? void 0 : _276.qfirstTotal),
                                firstTotalDate2: safeParseFloat((_278 = (_277 = data.qassets) === null || _277 === void 0 ? void 0 : _277.qcurrent) === null || _278 === void 0 ? void 0 : _278.qfirstTotalDate2),
                                secondTotal: safeParseFloat((_280 = (_279 = data.qassets) === null || _279 === void 0 ? void 0 : _279.qcurrent) === null || _280 === void 0 ? void 0 : _280.qsecondTotal),
                                secondTotalDate2: safeParseFloat((_282 = (_281 = data.qassets) === null || _281 === void 0 ? void 0 : _281.qcurrent) === null || _282 === void 0 ? void 0 : _282.qsecondTotalDate2),
                                sfirtsTotalCurrentAssets: ((_284 = (_283 = data.qassets) === null || _283 === void 0 ? void 0 : _283.qcurrent) === null || _284 === void 0 ? void 0 : _284.qsfirtsTotalCurrentAssets) || "",
                                stotalCurrentAssets: ((_286 = (_285 = data.qassets) === null || _285 === void 0 ? void 0 : _285.qcurrent) === null || _286 === void 0 ? void 0 : _286.qstotalCurrentAssets) || "",
                            },
                            nonCurrent: {
                                snonCurrentAssets: ((_288 = (_287 = data.qassets) === null || _287 === void 0 ? void 0 : _287.qnonCurrent) === null || _288 === void 0 ? void 0 : _288.qsnonCurrentAssets) || "",
                                nonCurrentLabels: ensureArray((_290 = (_289 = data.qassets) === null || _289 === void 0 ? void 0 : _289.qnonCurrent) === null || _290 === void 0 ? void 0 : _290.qnonCurrentLabelsAr), // Fixed: was nonCurrentLabelsAr
                                nonCurrentNotes: ensureArray((_292 = (_291 = data.qassets) === null || _291 === void 0 ? void 0 : _291.qnonCurrent) === null || _292 === void 0 ? void 0 : _292.qnonCurrentNotes),
                                items: ensureArray((_294 = (_293 = data.qassets) === null || _293 === void 0 ? void 0 : _293.qnonCurrent) === null || _294 === void 0 ? void 0 : _294.qitems),
                                itemsDate2: ensureArray((_296 = (_295 = data.qassets) === null || _295 === void 0 ? void 0 : _295.qnonCurrent) === null || _296 === void 0 ? void 0 : _296.qitemsDate2),
                                subItems: ensureArray((_298 = (_297 = data.qassets) === null || _297 === void 0 ? void 0 : _297.qnonCurrent) === null || _298 === void 0 ? void 0 : _298.qsubItems),
                                subItemsDate2: ensureArray((_300 = (_299 = data.qassets) === null || _299 === void 0 ? void 0 : _299.qnonCurrent) === null || _300 === void 0 ? void 0 : _300.qsubItemsDate2),
                                nonCurrentSubLabels: ensureArray((_302 = (_301 = data.qassets) === null || _301 === void 0 ? void 0 : _301.qnonCurrent) === null || _302 === void 0 ? void 0 : _302.qnonCurrentSubLabelsAr), // Fixed: was nonCurrentSubLabelsAr
                                firstTotal: safeParseFloat((_304 = (_303 = data.qassets) === null || _303 === void 0 ? void 0 : _303.qnonCurrent) === null || _304 === void 0 ? void 0 : _304.qfirstTotal),
                                firstTotalDate2: safeParseFloat((_306 = (_305 = data.qassets) === null || _305 === void 0 ? void 0 : _305.qnonCurrent) === null || _306 === void 0 ? void 0 : _306.qfirstTotalDate2),
                                secondTotal: safeParseFloat((_308 = (_307 = data.qassets) === null || _307 === void 0 ? void 0 : _307.qnonCurrent) === null || _308 === void 0 ? void 0 : _308.qsecondTotal),
                                secondTotalDate2: safeParseFloat((_310 = (_309 = data.qassets) === null || _309 === void 0 ? void 0 : _309.qnonCurrent) === null || _310 === void 0 ? void 0 : _310.qsecondTotalDate2),
                                sfirtsTotalnonCurrentAssets: ((_312 = (_311 = data.qassets) === null || _311 === void 0 ? void 0 : _311.qnonCurrent) === null || _312 === void 0 ? void 0 : _312.qsfirtsTotalnonCurrentAssets) || "",
                                stotalNonCurrentAssets: ((_314 = (_313 = data.qassets) === null || _313 === void 0 ? void 0 : _313.qnonCurrent) === null || _314 === void 0 ? void 0 : _314.qstotalNonCurrentAssets) || "",
                            },
                            stotalAssets: ((_315 = data.qassets) === null || _315 === void 0 ? void 0 : _315.qstotalAssets) || "", // Added missing field
                            totalAssets: safeParseFloat((_316 = data.qassets) === null || _316 === void 0 ? void 0 : _316.qtotalAssets),
                            totalAssetsDate2: safeParseFloat((_317 = data.qassets) === null || _317 === void 0 ? void 0 : _317.qtotalAssetsDate2),
                        },
                        // Added missing data fields
                        data1En: data.qdata1En || null,
                        data2En: data.qdata2En || null,
                        equity: {
                            sShareholdersEquity: ((_318 = data.qequity) === null || _318 === void 0 ? void 0 : _318.qsShareholdersEquity) || "",
                            equityLabels: ensureArray((_319 = data.qequity) === null || _319 === void 0 ? void 0 : _319.qequityLabelsAr), // Fixed: was equityLabelsAr
                            equityItemsNotes: ensureArray((_320 = data.qequity) === null || _320 === void 0 ? void 0 : _320.qequityItemsNotes),
                            items: ensureArray((_321 = data.qequity) === null || _321 === void 0 ? void 0 : _321.qitems),
                            itemsDate2: ensureArray((_322 = data.qequity) === null || _322 === void 0 ? void 0 : _322.qitemsDate2),
                            equitySubLabels: ensureArray((_323 = data.qequity) === null || _323 === void 0 ? void 0 : _323.qequitySubLabelsAr), // Fixed: was equitySubLabelsAr
                            subItems: ensureArray((_324 = data.qequity) === null || _324 === void 0 ? void 0 : _324.qsubItems),
                            subItemsDate2: ensureArray((_325 = data.qequity) === null || _325 === void 0 ? void 0 : _325.qsubItemsDate2),
                            firstTotal: safeParseFloat((_326 = data.qequity) === null || _326 === void 0 ? void 0 : _326.qfirstTotal),
                            firstTotalDate2: safeParseFloat((_327 = data.qequity) === null || _327 === void 0 ? void 0 : _327.qfirstTotalDate2),
                            sfirtsTotalShareholdersEquity: ((_328 = data.qequity) === null || _328 === void 0 ? void 0 : _328.qsfirtsTotalShareholdersEquity) || "",
                            stotalShareholdersEquity: ((_329 = data.qequity) === null || _329 === void 0 ? void 0 : _329.qstotalShareholdersEquity) || "",
                            totalEquity: safeParseFloat((_330 = data.qequity) === null || _330 === void 0 ? void 0 : _330.qtotalEquity),
                            totalEquityDate2: safeParseFloat((_331 = data.qequity) === null || _331 === void 0 ? void 0 : _331.qtotalEquityDate2),
                        },
                        liabilities: {
                            liabilities: ((_332 = data.qliabilities) === null || _332 === void 0 ? void 0 : _332.qliabilities) || "",
                            current: {
                                scurrentliabilities: ((_334 = (_333 = data.qliabilities) === null || _333 === void 0 ? void 0 : _333.qcurrent) === null || _334 === void 0 ? void 0 : _334.qscurrentliabilities) || "",
                                currentLiabilitiesLabels: ensureArray((_336 = (_335 = data.qliabilities) === null || _335 === void 0 ? void 0 : _335.qcurrent) === null || _336 === void 0 ? void 0 : _336.qcurrentLiabilitiesLabelsAr), // Fixed: was currentLiabilitiesLabelsAr
                                currentLiabilitiesSubLabels: ensureArray((_338 = (_337 = data.qliabilities) === null || _337 === void 0 ? void 0 : _337.qcurrent) === null || _338 === void 0 ? void 0 : _338.qcurrentSubLiabilitiesLabelsAr), // Fixed: was currentSubLiabilitiesLabelsAr
                                items: ensureArray((_340 = (_339 = data.qliabilities) === null || _339 === void 0 ? void 0 : _339.qcurrent) === null || _340 === void 0 ? void 0 : _340.qitems),
                                itemsDate2: ensureArray((_342 = (_341 = data.qliabilities) === null || _341 === void 0 ? void 0 : _341.qcurrent) === null || _342 === void 0 ? void 0 : _342.qitemsDate2),
                                subItems: ensureArray((_344 = (_343 = data.qliabilities) === null || _343 === void 0 ? void 0 : _343.qcurrent) === null || _344 === void 0 ? void 0 : _344.qsubItems),
                                subItemsDate2: ensureArray((_346 = (_345 = data.qliabilities) === null || _345 === void 0 ? void 0 : _345.qcurrent) === null || _346 === void 0 ? void 0 : _346.qsubItemsDate2),
                                currentLiabilitiesNotes: ensureArray((_348 = (_347 = data.qliabilities) === null || _347 === void 0 ? void 0 : _347.qcurrent) === null || _348 === void 0 ? void 0 : _348.qcurrentLiabilitiesNotes),
                                firstTotal: safeParseFloat((_350 = (_349 = data.qliabilities) === null || _349 === void 0 ? void 0 : _349.qcurrent) === null || _350 === void 0 ? void 0 : _350.qfirstTotal),
                                firstTotalDate2: safeParseFloat((_352 = (_351 = data.qliabilities) === null || _351 === void 0 ? void 0 : _351.qcurrent) === null || _352 === void 0 ? void 0 : _352.qfirstTotalDate2),
                                total: safeParseFloat((_354 = (_353 = data.qliabilities) === null || _353 === void 0 ? void 0 : _353.qcurrent) === null || _354 === void 0 ? void 0 : _354.qtotal),
                                totalDate2: safeParseFloat((_356 = (_355 = data.qliabilities) === null || _355 === void 0 ? void 0 : _355.qcurrent) === null || _356 === void 0 ? void 0 : _356.qtotalDate2),
                                sfirtsTotalcurrentLiabilities: ((_358 = (_357 = data.qliabilities) === null || _357 === void 0 ? void 0 : _357.qcurrent) === null || _358 === void 0 ? void 0 : _358.qsfirtsTotalcurrentLiabilities) ||
                                    "",
                                stotalcurrentliabilities: ((_360 = (_359 = data.qliabilities) === null || _359 === void 0 ? void 0 : _359.qcurrent) === null || _360 === void 0 ? void 0 : _360.qstotalcurrentliabilities) || "",
                            },
                            nonCurrent: {
                                sNoncurrentliabilities: ((_362 = (_361 = data.qliabilities) === null || _361 === void 0 ? void 0 : _361.qnonCurrent) === null || _362 === void 0 ? void 0 : _362.qsNoncurrentliabilities) || "",
                                NonCurrentLiabilitiesLabels: ensureArray((_364 = (_363 = data.qliabilities) === null || _363 === void 0 ? void 0 : _363.qnonCurrent) === null || _364 === void 0 ? void 0 : _364.qnonCurrentLiabilitiesLabelsAr), // Fixed: was NonCurrentLiabilitiesLabelsAr
                                NonCurrentLiabilitiesSubLabels: ensureArray((_366 = (_365 = data.qliabilities) === null || _365 === void 0 ? void 0 : _365.qnonCurrent) === null || _366 === void 0 ? void 0 : _366.qnonCurrentSubLiabilitiesLabelsAr), // Fixed: was NonCurrentLiabilitiesSubLabelsAr
                                nonCurrentLiabilitiesNotes: ensureArray((_368 = (_367 = data.qliabilities) === null || _367 === void 0 ? void 0 : _367.qnonCurrent) === null || _368 === void 0 ? void 0 : _368.qnonCurrentLiabilitiesNotes),
                                items: ensureArray((_370 = (_369 = data.qliabilities) === null || _369 === void 0 ? void 0 : _369.qnonCurrent) === null || _370 === void 0 ? void 0 : _370.qitems),
                                itemsDate2: ensureArray((_372 = (_371 = data.qliabilities) === null || _371 === void 0 ? void 0 : _371.qnonCurrent) === null || _372 === void 0 ? void 0 : _372.qitemsDate2),
                                subItems: ensureArray((_374 = (_373 = data.qliabilities) === null || _373 === void 0 ? void 0 : _373.qnonCurrent) === null || _374 === void 0 ? void 0 : _374.qsubItems),
                                subItemsDate2: ensureArray((_376 = (_375 = data.qliabilities) === null || _375 === void 0 ? void 0 : _375.qnonCurrent) === null || _376 === void 0 ? void 0 : _376.qsubItemsDate2),
                                firstTotal: safeParseFloat((_378 = (_377 = data.qliabilities) === null || _377 === void 0 ? void 0 : _377.qnonCurrent) === null || _378 === void 0 ? void 0 : _378.qfirstTotal),
                                firstTotalDate2: safeParseFloat((_380 = (_379 = data.qliabilities) === null || _379 === void 0 ? void 0 : _379.qnonCurrent) === null || _380 === void 0 ? void 0 : _380.qfirstTotalDate2),
                                total: safeParseFloat((_382 = (_381 = data.qliabilities) === null || _381 === void 0 ? void 0 : _381.qnonCurrent) === null || _382 === void 0 ? void 0 : _382.qtotal),
                                totalDate2: safeParseFloat((_384 = (_383 = data.qliabilities) === null || _383 === void 0 ? void 0 : _383.qnonCurrent) === null || _384 === void 0 ? void 0 : _384.qtotalDate2),
                                sfirtsTotalNoncurrentLiabilities: ((_386 = (_385 = data.qliabilities) === null || _385 === void 0 ? void 0 : _385.qnonCurrent) === null || _386 === void 0 ? void 0 : _386.qsfirtsTotalNoncurrentLiabilities) || "",
                                stotalNoncurrentliabilities: ((_388 = (_387 = data.qliabilities) === null || _387 === void 0 ? void 0 : _387.qnonCurrent) === null || _388 === void 0 ? void 0 : _388.qstotalNoncurrentliabilities) || "",
                            },
                            stotalliabilities: ((_389 = data.qliabilities) === null || _389 === void 0 ? void 0 : _389.qstotalliabilities) || "",
                            totalLiabilities: safeParseFloat((_390 = data.qliabilities) === null || _390 === void 0 ? void 0 : _390.qtotalLiabilities),
                            totalLiabilitiesDate2: safeParseFloat((_391 = data.qliabilities) === null || _391 === void 0 ? void 0 : _391.qtotalLiabilitiesDate2),
                        },
                        sShareholdersEquityandliabilitiess: (data === null || data === void 0 ? void 0 : data.qShareholdersEquityandliabilitiess) || "",
                        stotalEquityAndLiabilities: (data === null || data === void 0 ? void 0 : data.qstotalEquityAndLiabilities) || "",
                        ItotalEquityAndLiabilities: safeParseFloat(data === null || data === void 0 ? void 0 : data.qItotalEquityAndLiabilities),
                        ItotalEquityAndLiabilitiesDate2: safeParseFloat(data === null || data === void 0 ? void 0 : data.qItotalEquityAndLiabilitiesDate2),
                    };
                    // Update the BalanceSheet data in the document
                    matchedDocument.formData[section].table.BalanceSheet =
                        balanceSheetData;
                    // Save the updated document with error handling
                    try {
                        yield matchedDocument.save();
                        console.log("Document saved successfully");
                        // Verify the saved totals by retrieving the document
                        const verifiedDoc = yield ArabicDocumentSchema_1.ArabicDocument.findById(matchedDocument._id);
                        const savedBalanceSheet = (_393 = (_392 = verifiedDoc === null || verifiedDoc === void 0 ? void 0 : verifiedDoc.formData[section]) === null || _392 === void 0 ? void 0 : _392.table) === null || _393 === void 0 ? void 0 : _393.BalanceSheet;
                        console.log("Verification - Total values after save:");
                        console.log("Assets Total:", (_394 = savedBalanceSheet === null || savedBalanceSheet === void 0 ? void 0 : savedBalanceSheet.assets) === null || _394 === void 0 ? void 0 : _394.totalAssets);
                        console.log("Equity Total:", (_395 = savedBalanceSheet === null || savedBalanceSheet === void 0 ? void 0 : savedBalanceSheet.equity) === null || _395 === void 0 ? void 0 : _395.totalEquity);
                        console.log("Liabilities Total:", (_396 = savedBalanceSheet === null || savedBalanceSheet === void 0 ? void 0 : savedBalanceSheet.liabilities) === null || _396 === void 0 ? void 0 : _396.totalLiabilities);
                        return res.status(200).json({
                            success: true,
                            message: "Balance sheet  Arabic data saved successfully.",
                            Tabledata: matchedDocument.formData[section].table.BalanceSheet,
                        });
                    }
                    catch (saveError) {
                        console.error("Error saving document:", saveError);
                        return res.status(500).json({
                            success: false,
                            message: "Error saving document",
                            error: saveError.message,
                        });
                    }
                }
                else if (category === "CashFlow" && data) {
                    console.log("this is the cashflow object Arabic : back-end ", data);
                    const CashFlowDataAr = {
                        date1Ar: data.qdate1,
                        date2Ar: data.qdate2,
                        sectionOne: {
                            sectionOneFirstLabelEn: ((_397 = data.sectionOne) === null || _397 === void 0 ? void 0 : _397.qsectionOneFirstLabelEn) || "",
                            sectionOneLabelsEn: ensureArray((_398 = data.qsectionOne) === null || _398 === void 0 ? void 0 : _398.qsectionOneLabelsEn),
                            sectionOneNotesEn: ensureArray((_399 = data.sectionOne) === null || _399 === void 0 ? void 0 : _399.qsectionOneNotesEn),
                            sectionOneItemsEn: ensureArray((_400 = data.qsectionOne) === null || _400 === void 0 ? void 0 : _400.qsectionOneItemsEn),
                            sectionOneItemsDate2En: ensureArray((_401 = data.qsectionOne) === null || _401 === void 0 ? void 0 : _401.qsectionOneItemsDate2En),
                            sectionOneTotalLabel: ((_402 = data.qsectionOne) === null || _402 === void 0 ? void 0 : _402.qsectionOneTotalLabel) || "",
                            TotalsectionOneItemsEn: safeParseFloat((_403 = data.qsectionOne) === null || _403 === void 0 ? void 0 : _403.qTotalsectionOneItemsEn),
                            TotalsectionOneItemsDate2En: safeParseFloat((_404 = data.qsectionOne) === null || _404 === void 0 ? void 0 : _404.qTotalsectionOneItemsDate2En),
                        },
                        sectionTwo: {
                            sectionTwoLabelsEn: ensureArray((_405 = data.qsectionTwo) === null || _405 === void 0 ? void 0 : _405.qsectionTwoLabelsEn),
                            sectionTwoNotesEn: ensureArray((_406 = data.qsectionTwo) === null || _406 === void 0 ? void 0 : _406.qsectionTwoNotesEn),
                            sectionTwoItemsEn: ensureArray((_407 = data.qsectionTwo) === null || _407 === void 0 ? void 0 : _407.qsectionTwoItemsEn),
                            sectionTwoItemsDate2En: ensureArray((_408 = data.qsectionTwo) === null || _408 === void 0 ? void 0 : _408.qsectionTwoItemsDate2En),
                            sectionTwoTotalLabel: ((_409 = data.qsectionTwo) === null || _409 === void 0 ? void 0 : _409.qsectionTwoTotalLabel) || "",
                            TotalsectionTwoItemsEn: safeParseFloat((_410 = data.qsectionTwo) === null || _410 === void 0 ? void 0 : _410.qTotalsectionTwoItemsEn),
                            TotalsectionTwoItemsDate2En: safeParseFloat((_411 = data.qsectionTwo) === null || _411 === void 0 ? void 0 : _411.qTotalsectionTwoItemsDate2En),
                        },
                        sectionThree: {
                            sectionThreeLabelsEn: ensureArray((_412 = data.qsectionThree) === null || _412 === void 0 ? void 0 : _412.qsectionThreeLabelsEn),
                            sectionThreeNotesEn: ensureArray((_413 = data.qsectionThree) === null || _413 === void 0 ? void 0 : _413.qsectionThreeNotesEn),
                            sectionThreeItemsEn: ensureArray((_414 = data.qsectionThree) === null || _414 === void 0 ? void 0 : _414.qsectionThreeItemsEn),
                            sectionThreeItemsDate2En: ensureArray((_415 = data.qsectionThree) === null || _415 === void 0 ? void 0 : _415.qsectionThreeItemsDate2En),
                            sectionThreeTotalLabel: ((_416 = data.qsectionThree) === null || _416 === void 0 ? void 0 : _416.qsectionThreeTotalLabel) || "",
                            TotalsectionThreeItemsEn: safeParseFloat((_417 = data.qsectionThree) === null || _417 === void 0 ? void 0 : _417.qTotalsectionThreeItemsEn),
                            TotalsectionThreeItemsDate2En: safeParseFloat((_418 = data.qsectionThree) === null || _418 === void 0 ? void 0 : _418.qTotalsectionThreeItemsDate2En),
                        },
                        sectionFour: {
                            sectionFourLabelsEn: ensureArray((_419 = data.qsectionFour) === null || _419 === void 0 ? void 0 : _419.qsectionFourLabelsEn),
                            sectionFourNotesEn: ensureArray((_420 = data.qsectionFour) === null || _420 === void 0 ? void 0 : _420.qsectionFourNotesEn),
                            sectionFourItemsEn: ensureArray((_421 = data.qsectionFour) === null || _421 === void 0 ? void 0 : _421.qsectionFourItemsEn),
                            sectionFourItemsDate2En: ensureArray((_422 = data.qsectionFour) === null || _422 === void 0 ? void 0 : _422.qsectionFourItemsDate2En),
                            sectionFourTotalLabel: ((_423 = data.qsectionFour) === null || _423 === void 0 ? void 0 : _423.qsectionFourTotalLabel) || "",
                            TotalsectionFourItemsEn: safeParseFloat((_424 = data.qsectionFour) === null || _424 === void 0 ? void 0 : _424.qTotalsectionFourItemsEn),
                            TotalsectionFourItemsDate2En: safeParseFloat((_425 = data.qsectionFour) === null || _425 === void 0 ? void 0 : _425.qTotalsectionFourItemsDate2En),
                        },
                        sectionFourSub: {
                            sectionFourSubFirstLabelEn: ((_426 = data.qsectionFour) === null || _426 === void 0 ? void 0 : _426.qsectionFourSubFirstLabelEn) || "",
                            sectionFourSubLabelsEn: ensureArray((_427 = data.qsectionFour) === null || _427 === void 0 ? void 0 : _427.qsectionFourSubLabelsEn),
                            sectionFourSubNotesEn: ensureArray((_428 = data.qsectionFour) === null || _428 === void 0 ? void 0 : _428.qsectionFourSubNotesEn),
                            sectionFourSubItemsEn: ensureArray((_429 = data.qsectionFour) === null || _429 === void 0 ? void 0 : _429.qsectionFourSubItemsEn),
                            sectionFourSubItemsDate2En: ensureArray((_430 = data.sectionFour) === null || _430 === void 0 ? void 0 : _430.qsectionFourSubItemsDate2En),
                            sectionFourSubTotalLabel: ((_431 = data.qsectionFour) === null || _431 === void 0 ? void 0 : _431.qsectionFourSubTotalLabel) || "",
                            TotalsectionFourSubItemsEn: safeParseFloat((_432 = data.qsectionFour) === null || _432 === void 0 ? void 0 : _432.qTotalsectionFourSubItemsEn),
                            TotalsectionFourSubItemsDate2En: safeParseFloat((_433 = data.qsectionFour) === null || _433 === void 0 ? void 0 : _433.qTotalsectionFourSubItemsDate2En),
                        },
                        sectionFourAttributeOne: {
                            sectionFourAttribute: (_434 = data.sectionAttributeOne) === null || _434 === void 0 ? void 0 : _434.qsectionFourAttribute,
                            sectionFourAttributeLabelsEn: ensureArray((_435 = data.sectionAttributeOne) === null || _435 === void 0 ? void 0 : _435.qsectionFourAttributeLabelsEn),
                            sectionFourAttributeItemsEn: ensureArray((_436 = data.sectionAttributeOne) === null || _436 === void 0 ? void 0 : _436.qsectionFourAttributeItemsEn),
                            sectionFourAttributeItemsDate2En: ensureArray((_437 = data.sectionAttributeOne) === null || _437 === void 0 ? void 0 : _437.qsectionFourAttributeItemsDate2En),
                            TotalsectionFourAttributeItemsEn: safeParseFloat((_438 = data.sectionAttributeOne) === null || _438 === void 0 ? void 0 : _438.qTotalsectionFourAttributeItemsEn),
                            TotalsectionFourAttributeItemsDate2En: safeParseFloat((_439 = data.sectionAttributeOne) === null || _439 === void 0 ? void 0 : _439.qTotalsectionFourAttributeItemsDate2En),
                        },
                        sectionAttributeTwo: {
                            sectionFourAttribute2: ((_440 = data.sectionAttributeTwo) === null || _440 === void 0 ? void 0 : _440.qsectionFourAttribute2) || "",
                            sectionFourAttribute2LabelsEn: ensureArray((_441 = data.sectionAttributeTwo) === null || _441 === void 0 ? void 0 : _441.qsectionFourAttribute2LabelsEn),
                            sectionFourAttribute2ItemsEn: ensureArray((_442 = data.sectionAttributeTwo) === null || _442 === void 0 ? void 0 : _442.qsectionFourAttribute2ItemsEn),
                            sectionFourAttribute2ItemsDate2En: ensureArray((_443 = data.sectionAttributeTwo) === null || _443 === void 0 ? void 0 : _443.qsectionFourAttribute2ItemsDate2En),
                            TotalsectionFourAttribute2ItemsEn: safeParseFloat((_444 = data.sectionAttributeTwo) === null || _444 === void 0 ? void 0 : _444.qTotalsectionFourAttribute2ItemsEn),
                            TotalsectionFourAttribute2ItemsDate2En: safeParseFloat((_445 = data.sectionAttributeTwo) === null || _445 === void 0 ? void 0 : _445.qTotalsectionFourAttribute2ItemsDate2En),
                        },
                        sectionOtherComprehensiveIncome: {
                            sectionFourOtherComprehensiveIncome: ((_446 = data.sectionOtherComprehensiveIncome) === null || _446 === void 0 ? void 0 : _446.qsectionFourOtherComprehensiveIncome) || "",
                            sectionFourOtherComprehensiveIncomeSubheading: ((_447 = data.sectionOtherComprehensiveIncome) === null || _447 === void 0 ? void 0 : _447.qsectionFourOtherComprehensiveIncomeSubheading) || "",
                            sectionFourOtherComprehensiveIncomeSubheadingLabelsEn: ensureArray((_448 = data.sectionOtherComprehensiveIncome) === null || _448 === void 0 ? void 0 : _448.qsectionFourOtherComprehensiveIncomeSubheadingLabelsEn),
                            sectionFourOtherComprehensiveIncomeSubheadingNotesEn: ensureArray((_449 = data.sectionOtherComprehensiveIncome) === null || _449 === void 0 ? void 0 : _449.qsectionFourOtherComprehensiveIncomeSubheadingNotesEn),
                            sectionFourOtherComprehensiveIncomeSubheadingItemsEn: ensureArray((_450 = data.sectionOtherComprehensiveIncome) === null || _450 === void 0 ? void 0 : _450.qsectionFourOtherComprehensiveIncomeSubheadingItemsEn),
                            sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: ensureArray((_451 = data.sectionOtherComprehensiveIncome) === null || _451 === void 0 ? void 0 : _451.qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En),
                        },
                        Table2: {
                            dateTwo1Ar: data.qTable2.qdateTwo1Ar,
                            dateTwo2Ar: data.qTable2.qdateTwo2Ar,
                            sectionOneTable2: {
                                qsectionLastLabel: ((_453 = (_452 = data.qTable2) === null || _452 === void 0 ? void 0 : _452.qsectionOneTable2) === null || _453 === void 0 ? void 0 : _453.qsectionLastLabel) || "",
                                qTotalsectionFourSubItemsEn: safeParseFloat((_455 = (_454 = data.qTable2) === null || _454 === void 0 ? void 0 : _454.qsectionOneTable2) === null || _455 === void 0 ? void 0 : _455.qTotalsectionFourSubItemsEn),
                                qTotalsectionFourSubItemsDate2En: safeParseFloat((_457 = (_456 = data.qTable2) === null || _456 === void 0 ? void 0 : _456.qsectionOneTable2) === null || _457 === void 0 ? void 0 : _457.qTotalsectionFourSubItemsDate2En),
                                qsectionSevenLastLabel: ((_459 = (_458 = data.qTable2) === null || _458 === void 0 ? void 0 : _458.qsectionOneTable2) === null || _459 === void 0 ? void 0 : _459.qsectionSevenLastLabel) || "",
                                qsectionSevenSubheading: ((_461 = (_460 = data.qTable2) === null || _460 === void 0 ? void 0 : _460.qsectionOneTable2) === null || _461 === void 0 ? void 0 : _461.qsectionSevenSubheading) || "",
                                qsectionLastLabelsEn: ensureArray((_463 = (_462 = data.qTable2) === null || _462 === void 0 ? void 0 : _462.qsectionOneTable2) === null || _463 === void 0 ? void 0 : _463.qsectionLastLabelsEn),
                                qsectionLastNotesEn: ensureArray((_465 = (_464 = data.qTable2) === null || _464 === void 0 ? void 0 : _464.qsectionOneTable2) === null || _465 === void 0 ? void 0 : _465.qsectionLastNotesEn),
                                qsectionLastItemsEn: ensureArray((_467 = (_466 = data.qTable2) === null || _466 === void 0 ? void 0 : _466.qsectionOneTable2) === null || _467 === void 0 ? void 0 : _467.qsectionLastItemsEn),
                                qsectionLastItemsDate2En: ensureArray((_469 = (_468 = data.qTable2) === null || _468 === void 0 ? void 0 : _468.qsectionOneTable2) === null || _469 === void 0 ? void 0 : _469.qsectionLastItemsDate2En),
                                qsectionLastTotalLabelEn: ((_471 = (_470 = data.qTable2) === null || _470 === void 0 ? void 0 : _470.qsectionOneTable2) === null || _471 === void 0 ? void 0 : _471.qsectionLastTotalLabelEn) || "",
                                qTotalSectionLastLabelItemsEn: safeParseFloat((_473 = (_472 = data.qTable2) === null || _472 === void 0 ? void 0 : _472.qsectionOneTable2) === null || _473 === void 0 ? void 0 : _473.qTotalSectionLastLabelItemsEn),
                                qTotalSectionLastItemsDate2En: safeParseFloat((_475 = (_474 = data.qTable2) === null || _474 === void 0 ? void 0 : _474.qsectionOneTable2) === null || _475 === void 0 ? void 0 : _475.qTotalSectionLastItemsDate2En),
                            },
                            sectionTwoTable2: {
                                qsectionSevenSubheading2: ((_477 = (_476 = data.qTable2) === null || _476 === void 0 ? void 0 : _476.qsectionTwoTable2) === null || _477 === void 0 ? void 0 : _477.qsectionSevenSubheading2) || "",
                                qsectionLastLabelsEn2: ensureArray((_479 = (_478 = data.qTable2) === null || _478 === void 0 ? void 0 : _478.qsectionTwoTable2) === null || _479 === void 0 ? void 0 : _479.qsectionLastLabelsEn2),
                                qsectionLastNotesEn2: ensureArray((_481 = (_480 = data.qTable2) === null || _480 === void 0 ? void 0 : _480.qsectionTwoTable2) === null || _481 === void 0 ? void 0 : _481.qsectionLastNotesEn2),
                                qsectionLastItemsEn2: ensureArray((_483 = (_482 = data.qTable2) === null || _482 === void 0 ? void 0 : _482.qsectionTwoTable2) === null || _483 === void 0 ? void 0 : _483.qsectionLastItemsEn2),
                                qsectionLastItemsDate2En2: ensureArray((_485 = (_484 = data.qTable2) === null || _484 === void 0 ? void 0 : _484.qsectionTwoTable2) === null || _485 === void 0 ? void 0 : _485.qsectionLastItemsDate2En2),
                                qsectionLastTotalLabelEn2: ((_487 = (_486 = data.qTable2) === null || _486 === void 0 ? void 0 : _486.qsectionTwoTable2) === null || _487 === void 0 ? void 0 : _487.qsectionLastTotalLabelEn2) || "",
                                qTotalSectionLastLabelItemsEn2: safeParseFloat((_489 = (_488 = data.qTable2) === null || _488 === void 0 ? void 0 : _488.qsectionTwoTable2) === null || _489 === void 0 ? void 0 : _489.qTotalSectionLastLabelItemsEn2),
                                qTotalSectionLastItemsDate2En2: safeParseFloat((_491 = (_490 = data.qTable2) === null || _490 === void 0 ? void 0 : _490.qsectionTwoTable2) === null || _491 === void 0 ? void 0 : _491.qTotalSectionLastItemsDate2En2),
                                totalOtherComp: {
                                    qSectionSevenSecondLastLabel2: ((_494 = (_493 = (_492 = data.qTable2) === null || _492 === void 0 ? void 0 : _492.qsectionTwoTable2) === null || _493 === void 0 ? void 0 : _493.qtotalOtherComp) === null || _494 === void 0 ? void 0 : _494.qSectionSevenSecondLastLabel2) || "",
                                    qTotalsectionSevenSecondLastItemEn: safeParseFloat((_497 = (_496 = (_495 = data.qTable2) === null || _495 === void 0 ? void 0 : _495.qsectionTwoTable2) === null || _496 === void 0 ? void 0 : _496.qtotalOtherComp) === null || _497 === void 0 ? void 0 : _497.qTotalsectionSevenSecondLastItemEn),
                                    qTotalsectionSevenSecondLastItemsDate2En: safeParseFloat((_500 = (_499 = (_498 = data.qTable2) === null || _498 === void 0 ? void 0 : _498.qsectionTwoTable2) === null || _499 === void 0 ? void 0 : _499.qtotalOtherComp) === null || _500 === void 0 ? void 0 : _500.qTotalsectionSevenSecondLastItemsDate2En),
                                },
                                totalComprehensiveLoss: {
                                    qSectionSevenLastLabel2: ((_503 = (_502 = (_501 = data.qTable2) === null || _501 === void 0 ? void 0 : _501.qsectionTwoTable2) === null || _502 === void 0 ? void 0 : _502.qtotalComprehensiveLoss) === null || _503 === void 0 ? void 0 : _503.qSectionSevenLastLabel2) || "",
                                    qTotalsectionSevenLastItemEn: safeParseFloat((_506 = (_505 = (_504 = data.qTable2) === null || _504 === void 0 ? void 0 : _504.qsectionTwoTable2) === null || _505 === void 0 ? void 0 : _505.qtotalComprehensiveLoss) === null || _506 === void 0 ? void 0 : _506.qTotalsectionSevenLastItemEn),
                                    qTotalsectionSevenLastItemsDate2En: safeParseFloat((_509 = (_508 = (_507 = data.qTable2) === null || _507 === void 0 ? void 0 : _507.qsectionTwoTable2) === null || _508 === void 0 ? void 0 : _508.qtotalComprehensiveLoss) === null || _509 === void 0 ? void 0 : _509.qTotalsectionSevenLastItemsDate2En),
                                },
                            },
                            sectionAttributeOneTable2: {
                                qsectionFourAttributeTable2: ((_511 = (_510 = data.qTable2) === null || _510 === void 0 ? void 0 : _510.qsectionAttributeOneTable2) === null || _511 === void 0 ? void 0 : _511.qsectionFourAttributeTable2) || "",
                                qsectionFourAttributeLabelsEnTable2: ensureArray((_513 = (_512 = data.qTable2) === null || _512 === void 0 ? void 0 : _512.qsectionAttributeOneTable2) === null || _513 === void 0 ? void 0 : _513.qsectionFourAttributeLabelsEnTable2),
                                qsectionFourAttributeItemsEnTable2: ensureArray((_515 = (_514 = data.qTable2) === null || _514 === void 0 ? void 0 : _514.qsectionAttributeOneTable2) === null || _515 === void 0 ? void 0 : _515.qsectionFourAttributeItemsEnTable2),
                                qsectionFourAttributeItemsDate2EnTable2: ensureArray((_517 = (_516 = data.qTable2) === null || _516 === void 0 ? void 0 : _516.qsectionAttributeOneTable2) === null || _517 === void 0 ? void 0 : _517.qsectionFourAttributeItemsDate2EnTable2),
                                qTotalsectionFourAttributeItemsEnTable2: safeParseFloat((_519 = (_518 = data.qTable2) === null || _518 === void 0 ? void 0 : _518.qsectionAttributeOneTable2) === null || _519 === void 0 ? void 0 : _519.qTotalsectionFourAttributeItemsEnTable2),
                                qTotalsectionFourAttributeItemsDate2EnTable2: safeParseFloat((_521 = (_520 = data.qTable2) === null || _520 === void 0 ? void 0 : _520.qsectionAttributeOneTable2) === null || _521 === void 0 ? void 0 : _521.qTotalsectionFourAttributeItemsDate2EnTable2),
                            },
                            sectionAttributeTwoTable2: {
                                qsectionFourAttribute2Table2: ((_523 = (_522 = data.qTable2) === null || _522 === void 0 ? void 0 : _522.qsectionAttributeTwoTable2) === null || _523 === void 0 ? void 0 : _523.qsectionFourAttribute2Table2) || "",
                                qsectionFourAttribute2LabelsEnTable2: ensureArray((_525 = (_524 = data.qTable2) === null || _524 === void 0 ? void 0 : _524.qsectionAttributeTwoTable2) === null || _525 === void 0 ? void 0 : _525.qsectionFourAttribute2LabelsEnTable2),
                                qsectionFourAttribute2ItemsEnTable2: ensureArray((_527 = (_526 = data.qTable2) === null || _526 === void 0 ? void 0 : _526.qsectionAttributeTwoTable2) === null || _527 === void 0 ? void 0 : _527.qsectionFourAttribute2ItemsEnTable2),
                                qsectionFourAttribute2ItemsDate2EnTable2: ensureArray((_529 = (_528 = data.qTable2) === null || _528 === void 0 ? void 0 : _528.qsectionAttributeTwoTable2) === null || _529 === void 0 ? void 0 : _529.qsectionFourAttribute2ItemsDate2EnTable2),
                                qTotalsectionFourAttribute2ItemsEnTable2: safeParseFloat((_531 = (_530 = data.qTable2) === null || _530 === void 0 ? void 0 : _530.qsectionAttributeTwoTable2) === null || _531 === void 0 ? void 0 : _531.qTotalsectionFourAttribute2ItemsEnTable2),
                                qTotalsectionFourAttribute2ItemsDate2EnTable2: safeParseFloat((_533 = (_532 = data.qTable2) === null || _532 === void 0 ? void 0 : _532.qsectionAttributeTwoTable2) === null || _533 === void 0 ? void 0 : _533.qTotalsectionFourAttribute2ItemsDate2EnTable2),
                            },
                            sectionOtherComprehensiveIncomeTable2: {
                                qsectionFourOtherComprehensiveIncomeTable2: ((_535 = (_534 = data.qTable2) === null || _534 === void 0 ? void 0 : _534.qsectionOtherComprehensiveIncomeTable2) === null || _535 === void 0 ? void 0 : _535.qsectionFourOtherComprehensiveIncomeTable2) || "",
                                qsectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: ensureArray((_537 = (_536 = data.qTable2) === null || _536 === void 0 ? void 0 : _536.qsectionOtherComprehensiveIncomeTable2) === null || _537 === void 0 ? void 0 : _537.qsectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2),
                                qsectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: ensureArray((_539 = (_538 = data.qTable2) === null || _538 === void 0 ? void 0 : _538.qsectionOtherComprehensiveIncomeTable2) === null || _539 === void 0 ? void 0 : _539.qsectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2),
                                qsectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: ensureArray((_541 = (_540 = data.qTable2) === null || _540 === void 0 ? void 0 : _540.qsectionOtherComprehensiveIncomeTable2) === null || _541 === void 0 ? void 0 : _541.qsectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2),
                                qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: ensureArray((_543 = (_542 = data.qTable2) === null || _542 === void 0 ? void 0 : _542.qsectionOtherComprehensiveIncomeTable2) === null || _543 === void 0 ? void 0 : _543.qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2),
                            },
                        }
                    };
                    // Assign the data
                    matchedDocument.formData[section].table.CashFlow = CashFlowDataAr;
                    try {
                        yield matchedDocument.save();
                        return res.status(200).json({
                            success: true,
                            message: "Cash Flow data Arabic saved successfully.",
                            Tabledata: matchedDocument.formData[section].table.CashFlow,
                        });
                    }
                    catch (saveError) {
                        console.error("Error saving document:", saveError);
                        return res.status(500).json({
                            success: false,
                            message: "Error saving document",
                            error: saveError.message,
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid table category or missing data.",
                    });
                }
            }
        }
        catch (error) {
            console.error("Error processing data:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error.",
                error: error.message,
            });
        }
    });
};
exports.adminAddTableController = adminAddTableController;
