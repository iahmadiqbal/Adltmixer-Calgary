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
}
