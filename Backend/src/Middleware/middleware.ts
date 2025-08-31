import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import Dotenv from "../Utils/Dotenv.js";
import { Payload } from "../Types/express.js"; 

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("entered");
    const JWT_SECRET = Dotenv.JWT_SECRET;
    console.log(JWT_SECRET);

  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined. Check your .env file and server start process.");
    return res.status(500).json({ message: "Internal Server Error: Server is not configured correctly." });
  }

  
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided.",
      success: false,
    });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET) as Payload;

    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token.",
      success: false,
    });
  }
};
