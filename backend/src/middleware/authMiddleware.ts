import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ message: "You are not authenticated" });
    }
    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, JWT_SECRET) as {
      email: string;
      id: string;
    };
    req.user = decodedData;
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

export default authMiddleware;
