"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./controllers/adminLogin"), exports);
__exportStar(require("./controllers/adminLogout"), exports);
__exportStar(require("./controllers/addDocument"), exports);
__exportStar(require("./controllers/deleteDocument"), exports);
__exportStar(require("./controllers/getAllDocuments"), exports);
__exportStar(require("./controllers/addDocumentArabic"), exports);
__exportStar(require("./controllers/getDocumetnByNickName"), exports);
__exportStar(require("./controllers/nickNameSuggestion"), exports);
__exportStar(require("./controllers/getDataWithSuggestions"), exports);
__exportStar(require("./controllers/getDocumentById"), exports);
__exportStar(require("./controllers/updateDocumentEnglish"), exports);
__exportStar(require("./controllers/updateDocumentArabic"), exports);
__exportStar(require("./controllers/verifyOtp"), exports);
