import { prisma } from "../../../config/prisma";
import { Prisma, Gender, Preference } from "@prisma/client";

export class UserService {
  static async getById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        firstName: true,
        lastName: true,
        bio: true,
        birthDate: true,
        gender: true,
        preference: true,
        profileImageUrl: true,
        isOnline: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async updateById(userId: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        firstName: true,
        lastName: true,
        bio: true,
        birthDate: true,
        gender: true,
        preference: true,
        profileImageUrl: true,
        isOnline: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async discover(currentUserId: string, limit: number, page: number) {
    const skip = (page - 1) * limit;

    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        gender: true,
        preference: true,
      },
    });

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    const genderFilter: Prisma.UserWhereInput[] = [];

    if (currentUser.preference === Preference.EVERYONE) {
      genderFilter.push({});
    } else if (currentUser.preference === Preference.MALE) {
      genderFilter.push({ gender: Gender.MALE });
    } else if (currentUser.preference === Preference.FEMALE) {
      genderFilter.push({ gender: Gender.FEMALE });
    }

    const preferenceFilter: Prisma.UserWhereInput[] = [];

    if (currentUser.gender === Gender.MALE) {
      preferenceFilter.push(
        { preference: Preference.MALE },
        { preference: Preference.EVERYONE },
      );
    } else if (currentUser.gender === Gender.FEMALE) {
      preferenceFilter.push(
        { preference: Preference.FEMALE },
        { preference: Preference.EVERYONE },
      );
    } else if (currentUser.gender === Gender.OTHER) {
      preferenceFilter.push({ preference: Preference.EVERYONE });
    }

    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId },
        deletedAt: null,
        isBlocked: false,
        AND: [{ OR: genderFilter }, { OR: preferenceFilter }],
      },
      skip,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        gender: true,
        preference: true,
        profileImageUrl: true,
        createdAt: true,
      },
    });

    return users;
  }

  static async getMatches(userId: string) {
    try {
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
              bio: true,
              gender: true,
              profileImageUrl: true,
              birthDate: true,
              isOnline: true,
              createdAt: true,
            },
          },
          user2: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              bio: true,
              gender: true,
              profileImageUrl: true,
              birthDate: true,
              isOnline: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const formattedMatches = matches.map((match) => {
        const otherUser = match.user1Id === userId ? match.user2 : match.user1;
        return {
          matchId: match.id,
          matchedAt: match.createdAt,
          user: otherUser,
        };
      });

      return formattedMatches;
    } catch (error) {
      console.error("Error fetching matches:", error);
      return [];
    }
  }
}
