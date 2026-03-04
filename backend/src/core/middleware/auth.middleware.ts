import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../../config/env";
import { AppError } from "../errors/AppError";

export interface JwtPayload {
  userId: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw new AppError("No token provided", 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!decoded.userId || !decoded.role) {
      throw new AppError("Invalid token payload", 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Invalid token", 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError("Token expired", 401));
    } else {
      next(error);
    }
  }
};

// Optional authentication - allows both authenticated and unauthenticated access
export const optionalAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No token provided, continue without user
      req.user = undefined;
      next();
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      req.user = undefined;
      next();
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (decoded.userId && decoded.role) {
      req.user = decoded;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    req.user = undefined;
    next();
  }
};

export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidden: Insufficient permissions", 403);
    }

    next();
  };
};
