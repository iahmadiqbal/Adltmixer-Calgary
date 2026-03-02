import { prisma } from "../../../config/prisma";
import { AppError } from "../../errors/AppError";

export class LikeService {
  static async createLike(fromUserId: string, toUserId: string) {
    if (fromUserId === toUserId) {
      throw new AppError("You cannot like yourself", 400);
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId,
        },
      },
    });

    if (existingLike) {
      throw new AppError("You already liked this user", 400);
    }

    const reverseLike = await prisma.like.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      },
    });

    const result = await prisma.$transaction(async (tx) => {
      const newLike = await tx.like.create({
        data: {
          fromUserId,
          toUserId,
        },
      });

      let matchCreated = false;
      let match = null;

      if (reverseLike) {
        const [user1Id, user2Id] =
          fromUserId < toUserId
            ? [fromUserId, toUserId]
            : [toUserId, fromUserId];

        const existingMatch = await tx.match.findUnique({
          where: {
            user1Id_user2Id: {
              user1Id,
              user2Id,
            },
          },
        });

        if (!existingMatch) {
          match = await tx.match.create({
            data: {
              user1Id,
              user2Id,
            },
          });
          matchCreated = true;
        }
      }

      return {
        liked: true,
        matchCreated,
        match,
      };
    });

    return result;
  }
}
