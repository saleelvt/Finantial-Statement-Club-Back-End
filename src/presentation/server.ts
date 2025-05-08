
// presentation/server.ts
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminRoutes } from "../infrastructure/routers";
import { adminDependencies } from "../boot/adminDependencies";
const EventEmitter = require("events");

EventEmitter.defaultMaxListeners = 100;
dotenv.config(); // Load environment variables
const app: Application = express();
const allowedOrigin = process.env.CLIENT_URL;
// CORS options
const corsOptions = {

  origin:allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  // allowedHeaders: ["*"],
};
// Middleware setup
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser()); 
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use("/api/v1/admin", adminRoutes(adminDependencies));
// Default route
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "API Not Found" });
});
export default app; // Export the Express instance (not yet listening)

