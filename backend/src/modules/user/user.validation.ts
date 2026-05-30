import { z } from "zod";

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    avatar: z.string().url().optional(),
    coverPhoto: z.string().url().optional(),
    bio: z.string().optional(),
  }),
});

export const UserValidation = {
  updateProfileValidationSchema,
};