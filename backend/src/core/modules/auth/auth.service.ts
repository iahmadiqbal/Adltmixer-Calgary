import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../../config/prisma";
import { env } from "../../../config/env";
import { Role, Gender, Preference } from "@prisma/client";
import { AppError } from "../../errors/AppError";

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  birthDate: string;
  gender: Gender;
  preference?: Preference;
}

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        preference: data.preference,
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as SignOptions,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        birthDate: user.birthDate,
        gender: user.gender,
        preference: user.preference,
        profileImageUrl: user.profileImageUrl,
        isOnline: user.isOnline,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.deletedAt) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as SignOptions,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        birthDate: user.birthDate,
        gender: user.gender,
        preference: user.preference,
        profileImageUrl: user.profileImageUrl,
        isOnline: user.isOnline,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}
