import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../../../config/prisma";
import { env } from "../../../config/env";
import { Role, Gender, Preference } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { EmailService } from "../../services/email.service";

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

    // Create user with emailVerified: true (temporarily disabled verification)
    // TODO: Change to false when domain is verified on Resend
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
        emailVerified: true, // Temporarily true - change to false after domain verification
      },
    });

    // Generate verification token (kept for future use)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

    // Save token to database (kept for future use)
    // TODO: Uncomment when email verification is re-enabled
    // await prisma.emailVerificationToken.create({
    //   data: {
    //     userId: user.id,
    //     token: verificationToken,
    //     expiresAt,
    //   },
    // });

    // Email sending temporarily disabled
    // TODO: Re-enable after domain verification on Resend
    // EmailService.sendVerificationEmail(
    //   user.email,
    //   user.firstName,
    //   verificationToken,
    // ).catch((error) => {
    //   console.error("Failed to send verification email:", error);
    // });

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
      message: "Registration successful! You can now login.", // Temporarily changed
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

    // Email verification check temporarily disabled
    // TODO: Re-enable after domain verification on Resend
    // if (!user.emailVerified) {
    //   throw new AppError(
    //     "Please verify your email before logging in. Check your inbox for the verification link.",
    //     403,
    //   );
    // }

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

  static async verifyEmail(token: string) {
    // Find the verification token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      throw new AppError("Invalid or expired verification token", 400);
    }

    // Check if token is expired
    if (new Date() > verificationToken.expiresAt) {
      // Delete expired token
      await prisma.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });
      throw new AppError(
        "Verification token has expired. Please request a new one.",
        400,
      );
    }

    // Update user's emailVerified status
    const user = await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true },
    });

    // Delete the verification token
    await prisma.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    return {
      message: "Email verified successfully! You can now log in.",
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    };
  }

  static async resendVerificationEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.emailVerified) {
      throw new AppError("Email is already verified", 400);
    }

    // Delete any existing tokens for this user
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Save new token
    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt,
      },
    });

    // Send verification email (non-blocking - fire and forget)
    EmailService.sendVerificationEmail(
      user.email,
      user.firstName,
      verificationToken,
    ).catch((error) => {
      console.error("Failed to send verification email:", error);
      // Error is logged but doesn't block the response
    });

    return {
      message: "Verification email sent! Please check your inbox.",
    };
  }
}
