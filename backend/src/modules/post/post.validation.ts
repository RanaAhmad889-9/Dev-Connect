import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required"),

    image: z
      .string()
      .optional(),

    visibility: z
      .enum(["public", "private"])
      .optional(),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
};