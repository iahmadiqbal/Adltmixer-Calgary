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
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const users = await UserService.discover(req.user.userId, limit, page);

    res.status(200).json(users);
  });

  static updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const validated = updateProfileSchema.parse(req.body);

    const updatedUser = await UserService.updateById(
      req.user.userId,
      validated,
    );

    res.status(200).json(updatedUser);
  });
}
