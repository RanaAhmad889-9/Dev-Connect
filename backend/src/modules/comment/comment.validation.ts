import { z } from "zod";

const createCommentValidationSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required"),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required")
      .optional(),
  }),
});

export const CommentValidation = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};