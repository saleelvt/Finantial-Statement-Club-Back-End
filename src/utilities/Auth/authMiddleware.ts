import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: string; // Add custom property to request
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) : any  => {
  const authHeader = req.headers.authorization;
  console.log("thiiiiiiiiiiiiiiiiiiiiiiieeeeeeeereirier: #$@$#@",authHeader);
   
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret") as { adminId: string };
    req.adminId = decoded.adminId; // Attach decoded data to the request object
    next(); // Pass control to the next middleware/route
  } catch (error) {

    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

