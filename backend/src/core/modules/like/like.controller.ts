import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../errors/AppError";
import { LikeService } from "./like.service";

export class LikeController {
  static createLike = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { toUserId } = req.body;

    if (!toUserId || typeof toUserId !== "string") {
      throw new AppError("toUserId is required", 400);
    }

    const result = await LikeService.createLike(req.user.userId, toUserId);

    res.status(201).json(result);
  });
}
