"use strict";
// main file (e.g., index.ts)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAdmin = void 0;
const db_1 = require("./boot/db");
const dotenv_1 = __importDefault(require("dotenv"));
const adminSchema_1 = require("./infrastructure/database/models/adminSchema");
const server_1 = __importDefault(require("./presentation/server"));
dotenv_1.default.config(); // Load environment variables
// Function to initialize an admin (example)
const insertAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const sampleAdmin = {
        userName: "FinancialClub",
        email: "techno12.ab@outlook.com",
        password: "admin@13",
    };
    // Insert logic for saving admin to the database if required here
    try {
        const existingAdmin = yield adminSchema_1.Admin.findOne({ email: sampleAdmin.email });
        if (!existingAdmin) {
            const newAdmin = new adminSchema_1.Admin(sampleAdmin);
            yield newAdmin.save();
            console.log("this is the admin now ", newAdmin);
        }
        else {
            console.log(" ADMIN ALLREDY EXISTED  ");
        }
    }
    catch (error) {
        console.error("Failed to insert sample admin:", error);
    }
});
exports.insertAdmin = insertAdmin;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Initializing server and database connection...");
        // Start database connection
        yield (0, db_1.db)()
            .then(() => console.log("Database connected in index page finish"))
            .catch((error) => {
            console.error("Error while connecting MongoDB", error);
            process.exit(0); // Exit on DB connection failure
        });
        server_1.default.listen(Number(process.env.PORT) || 2002, () => {
            console.log(`Server started on port ${process.env.PORT || 2002}`);
        });
    }
    catch (error) {
        console.log("Error on start up: ", error);
    }
    finally {
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Server is shutting down...");
            process.exit();
        }));
    }
}))();
// insertAdmin()
