import { AdminEntity } from "@/domain/entities";
import { Admin } from "../../models/adminSchema";

/**
 * Finds an admin by email.
 * @param email - Email address to search for.
 * @returns AdminEntity if found, otherwise null.
 */
export const adminFindByEmail = async (
  email: string
): Promise<AdminEntity | null> => {
  try {
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email provided.");
    }

    console.log("🔍 Searching admin with email:", email);

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      console.warn("⚠️ No admin found for email:", email);
      return null;
    }

    return existingAdmin as AdminEntity;
  } catch (error: any) {
    console.error("❌ Error in adminFindByEmail:", error?.message);
    throw new Error(`adminFindByEmail failed: ${error?.message}`);
  }
};
