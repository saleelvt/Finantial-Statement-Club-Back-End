"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// presentation/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routers_1 = require("../infrastructure/routers");
const adminDependencies_1 = require("../boot/adminDependencies");
const EventEmitter = require("events");
EventEmitter.defaultMaxListeners = 100;
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const allowedOrigin = process.env.CLIENT_URL;
// CORS options
const corsOptions = {
    origin: allowedOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // allowedHeaders: ["*"],
};
// Middleware setup
app.use(express_1.default.json({ limit: "200mb" }));
app.use(express_1.default.urlencoded({ limit: "200mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use("/api/v1/admin", (0, routers_1.adminRoutes)(adminDependencies_1.adminDependencies));
// Default route
app.use("*", (req, res) => {
    res.status(404).json({ success: false, status: 404, message: "API Not Found" });
});
exports.default = app; // Export the Express instance (not yet listening)
