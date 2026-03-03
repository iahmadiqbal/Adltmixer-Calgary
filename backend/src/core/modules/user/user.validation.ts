import { z } from "zod";
import { Preference } from "@prisma/client";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().optional(),
  bio: z.string().max(500).optional(),
  preference: z.nativeEnum(Preference).optional(),
  profileImageUrl: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
