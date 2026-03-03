import { prisma } from "../../../config/prisma";
import { AppError } from "../../errors/AppError";

export class MessageService {
  static async sendMessage(senderId: string, matchId: string, content: string) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new AppError("Match not found", 404);
    }

    if (match.user1Id !== senderId && match.user2Id !== senderId) {
      throw new AppError("You are not part of this match", 403);
    }

    const message = await prisma.message.create({
      data: {
        matchId,
        senderId,
        content,
      },
    });

    return message;
  }

  static async getMessagesByMatch(userId: string, matchId: string) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new AppError("Match not found", 404);
    }

    if (match.user1Id !== userId && match.user2Id !== userId) {
      throw new AppError("You are not part of this match", 403);
    }

    const messages = await prisma.message.findMany({
      where: { matchId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        matchId: true,
        senderId: true,
        content: true,
        createdAt: true,
      },
    });

    return messages;
  }

  static async getConversations(userId: string) {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
        user2: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const conversations = matches.map((match) => {
      const otherUser = match.user1Id === userId ? match.user2 : match.user1;
      const lastMessage = match.messages[0] || null;

      return {
        matchId: match.id,
        otherUser,
        lastMessage: lastMessage ? lastMessage.content : null,
        lastMessageAt: lastMessage ? lastMessage.createdAt : match.createdAt,
      };
    });

    return conversations;
  }

  static async getMatchByUsers(userId: string, otherUserId: string) {
    const match = await prisma.match.findFirst({
      where: {
        OR: [
          { user1Id: userId, user2Id: otherUserId },
          { user1Id: otherUserId, user2Id: userId },
        ],
      },
      include: {
        user1: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
            isOnline: true,
          },
        },
        user2: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
            isOnline: true,
          },
        },
      },
    });

    if (!match) {
      throw new AppError("Match not found", 404);
    }

    const otherUser = match.user1Id === userId ? match.user2 : match.user1;

    return {
      matchId: match.id,
      otherUser,
    };
  }
}
