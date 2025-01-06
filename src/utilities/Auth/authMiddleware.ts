import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';


dotenv.config();

export const verifyAccessToken = ( req: Request,res: Response,next: NextFunction) :any  => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: 'JWT secret is not defined' });
  }

  try {
    const decoded = Jwt.verify(token, secret);
    res.locals.user = decoded; // Store the decoded user in locals
     next(); // Pass control to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};
