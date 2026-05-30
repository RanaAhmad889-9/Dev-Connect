import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required"),

    image: z
      .string()
      .url("Image must be a valid URL")
      .optional(),

    visibility: z
      .enum(["public", "private"])
      .optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required")
      .optional(),

    image: z
      .string()
      .url("Image must be a valid URL")
      .optional(),

    visibility: z
      .enum(["public", "private"])
      .optional(),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};