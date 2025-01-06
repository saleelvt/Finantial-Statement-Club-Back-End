
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
 export const generateTokens = (adminId: string) => {
  const accessToken = jwt.sign(
    { adminId },
    process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret", // Access token secret
    { expiresIn: "1h" } // Set expiration for the access token
  );

  const refreshToken = jwt.sign(
    { adminId },
    process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret", // Refresh token secret
    { expiresIn: "7d" } // Set expiration for the refresh token
  );

  return { accessToken, refreshToken };
};
