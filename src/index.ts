// main file (e.g., index.ts)

import { db } from "./boot/db";
import dotenv from "dotenv";
import { Admin } from "./infrastructure/database/models/adminSchema";
import app from "./presentation/server";
dotenv.config(); // Load environment variables



// Function to initialize an admin (example)
export const insertAdmin = async () => {
  const sampleAdmin = {
    userName: "FinancialClub",
    email: "techno12.ab@outlook.com",
    password: "admin@13",
  };

  // Insert logic for saving admin to the database if required here
  try { 
    const existingAdmin = await Admin.findOne({ email: sampleAdmin.email });
    if (!existingAdmin) {
      const newAdmin = new Admin(sampleAdmin);
      await newAdmin.save();
      console.log("this is the admin now ", newAdmin);
    } else {
      console.log(" ADMIN ALLREDY EXISTED  ");
    }
  }  catch (error) {
    console.error("Failed to insert sample admin:", error);
  }
};

(async () => {
  try {
    console.log("Initializing server and database connection...");
    // Start database connection
    await db()
      .then(() => console.log("Database connected in index page finish"))
      .catch((error: any) => {
        console.error("Error while connecting MongoDB", error);
        process.exit(0); // Exit on DB connection failure
      });
    app.listen(Number(process.env.PORT) || 2001, () => {
      console.log(`Server started on port ${process.env.PORT || 2001}`);
    });


  } catch (error: any) {
    console.log("Error on start up: ", error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("Server is shutting down...");
      process.exit();
    });
  }
})();

// insertAdmin()