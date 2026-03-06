import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../errors/AppError";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.issues,
      });
    }

    const result = await AuthService.register(parsed.data);

    res.status(201).json(result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.issues,
      });
    }

    const result = await AuthService.login(
      parsed.data.email,
      parsed.data.password,
    );

    res.status(200).json(result);
  });

  static me = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    res.status(200).json({
      userId: req.user.userId,
      role: req.user.role,
    });
  });

  static verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Verification token is required",
      });
    }

    const result = await AuthService.verifyEmail(token);

    res.status(200).json(result);
  });

  static resendVerification = asyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const result = await AuthService.resendVerificationEmail(email);

      res.status(200).json(result);
    },
  );
}
