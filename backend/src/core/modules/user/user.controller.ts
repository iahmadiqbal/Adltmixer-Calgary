import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../errors/AppError";
import { UserService } from "./user.service";
import { updateProfileSchema } from "./user.validation";

export class UserController {
  static getMyProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await UserService.getById(req.user.userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json(user);
  });

  static discoverUsers = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    // Pass userId if authenticated, undefined if not
    const userId = req.user?.userId;
    const users = await UserService.discover(userId, limit, page);

    res.status(200).json(users);
  });

  static updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    console.log("=== UPDATE MY PROFILE CONTROLLER ===");
    console.log("Request body:", req.body);
    console.log("User from token:", req.user?.userId);

    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    try {
      console.log("Validating with schema...");
      const validated = updateProfileSchema.parse(req.body);
      console.log("Validated data:", validated);

      console.log("Calling service...");
      const updatedUser = await UserService.updateMyProfile(
        req.user.userId,
        validated,
      );

      console.log("Sending response:", updatedUser);
      console.log("=== END UPDATE MY PROFILE CONTROLLER ===");

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("=== VALIDATION OR SERVICE ERROR ===");
      console.error("Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  });

  static getMatches = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const matches = await UserService.getMatches(req.user.userId);

    res.status(200).json(matches);
  });

  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const id = req.params.id as string;

    const user = await UserService.getUserById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json(user);
  });
}
