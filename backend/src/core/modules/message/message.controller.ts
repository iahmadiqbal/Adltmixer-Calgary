import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../errors/AppError";
import { MessageService } from "./message.service";

export class MessageController {
  static sendMessage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { matchId, content } = req.body;

    if (!matchId || typeof matchId !== "string") {
      throw new AppError("matchId is required", 400);
    }

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      throw new AppError("content is required and cannot be empty", 400);
    }

    const message = await MessageService.sendMessage(
      req.user.userId,
      matchId,
      content.trim(),
    );

    res.status(201).json(message);
  });

  static getMessagesByMatch = asyncHandler(
    async (req: Request, res: Response) => {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      const { matchId } = req.params;

      if (!matchId) {
        throw new AppError("matchId is required", 400);
      }

      const messages = await MessageService.getMessagesByMatch(
        req.user.userId,
        matchId,
      );

      res.status(200).json(messages);
    },
  );

  static getConversations = asyncHandler(
    async (req: Request, res: Response) => {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      const conversations = await MessageService.getConversations(
        req.user.userId,
      );

      res.status(200).json(conversations);
    },
  );

  static getMatchByUsers = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { otherUserId } = req.params;

    if (!otherUserId) {
      throw new AppError("otherUserId is required", 400);
    }

    const match = await MessageService.getMatchByUsers(
      req.user.userId,
      otherUserId,
    );

    res.status(200).json(match);
  });
}
