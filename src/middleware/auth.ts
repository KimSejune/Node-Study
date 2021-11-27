import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { findById } from "../model/member";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "token must be included" });
    }
    const token = req.headers.authorization;
    const payload: any = await verifyToken(token);
    const user = await findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "token is invalid" });
  }
}
