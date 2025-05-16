// presentation/server.ts
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminRoutes } from "../infrastructure/routers";
import { adminDependencies } from "../boot/adminDependencies";

const EventEmitter = require("events");
EventEmitter.defaultMaxListeners = 100;

dotenv.config(); // Load .env

const app: Application = express();

// ------------------------------
// ✅ CORS configuration
// ------------------------------
const allowedOrigin = process.env.CLIENT_URL ;

const corsOptions = {
  origin:  allowedOrigin,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight requests

// ------------------------------
// ✅ Body parser limits (200MB)
// ------------------------------
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// ------------------------------
// ✅ Middleware
// ------------------------------
app.use(cookieParser());

// ------------------------------
// ✅ Routes
// ------------------------------
app.use("/api/v1/admin", adminRoutes(adminDependencies));

// ------------------------------
// ✅ 404 Handler
// ------------------------------
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "API Not Found" });
});

// ------------------------------
// ✅ Error Handler (optional but useful)
// ------------------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Internal error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;
