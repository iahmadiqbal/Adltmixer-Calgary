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

  static async updateMyProfile(
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      bio?: string;
      profileImageUrl?: string;
      preference?: Preference;
    },
  ) {
    console.log("=== UPDATE MY PROFILE SERVICE ===");
    console.log("User ID:", userId);
    console.log("Incoming data:", data);

    const updateData: Prisma.UserUpdateInput = {};

    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profileImageUrl !== undefined)
      updateData.profileImageUrl = data.profileImageUrl;
    if (data.preference !== undefined) updateData.preference = data.preference;

    console.log("Update data to be sent to Prisma:", updateData);
    console.log("Update data keys:", Object.keys(updateData));

    const result = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    console.log("Prisma update result:", result);
    console.log("=== END UPDATE MY PROFILE SERVICE ===");

    return result;
  }

  static async discover(
    currentUserId: string | undefined,
    limit: number,
    page: number,
  ) {
    const skip = (page - 1) * limit;

    // If no user is logged in, return all public profiles
    if (!currentUserId) {
      const users = await prisma.user.findMany({
        where: {
          deletedAt: null,
          isBlocked: false,
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
          birthDate: true,
          createdAt: true,
        },
      });
      return users;
    }

    // Authenticated user - personalized results
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
        birthDate: true,
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

  static async getUserById(userId: string) {
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
}
