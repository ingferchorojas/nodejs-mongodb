import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ data: {}, message: "Authentication failed", error: true });
    }

    const decodedToken: any = jwt.verify(token, "secret");

    req.body.email = decodedToken.email;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Internal server error", error: true });
  }
};
