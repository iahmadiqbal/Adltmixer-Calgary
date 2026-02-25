import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../errors/AppError";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const validated = registerSchema.parse(req.body);

    const result = await AuthService.register(validated);

    res.status(201).json(result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const validated = loginSchema.parse(req.body);

    const result = await AuthService.login(
      validated.email,
      validated.password
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