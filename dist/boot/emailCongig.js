"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD = exports.EMAIL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let EMAIL = String(process.env.Microsoft_EMAIL);
exports.EMAIL = EMAIL;
let PASSWORD = String(process.env.Microsoft_EMAIL_APP_PASSWORD);
exports.PASSWORD = PASSWORD;
