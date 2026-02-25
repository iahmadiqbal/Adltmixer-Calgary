import { z } from "zod";
import { Gender, Preference } from "@prisma/client";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  birthDate: z.string(), // ISO string
  gender: z.nativeEnum(Gender),
  preference: z.nativeEnum(Preference).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});