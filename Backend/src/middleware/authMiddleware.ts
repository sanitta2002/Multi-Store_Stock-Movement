import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { IJwtService } from "@/jwt/interface/IJwtService";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        role: "admin" | "user";
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    const token = authHeader.split(" ")[1] as string;

    const jwtService = container.resolve<IJwtService>("IJwtService");

    const payload = jwtService.verifyAccessToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};