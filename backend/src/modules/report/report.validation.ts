import { z } from "zod";

const createReportValidationSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .min(5, "Reason is required"),
  }),
});

const updateStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      "pending",
      "reviewing",
      "resolved",
      "rejected",
    ]),
  }),
});

const adminMessageValidationSchema = z.object({
  body: z.object({
    adminMessage: z
      .string()
      .min(1, "Message is required"),
  }),
});

const creatorResponseValidationSchema =
  z.object({
    body: z.object({
      creatorResponse: z
        .string()
        .min(1, "Response is required"),
    }),
  });

export const ReportValidation = {
  createReportValidationSchema,
  updateStatusValidationSchema,
  adminMessageValidationSchema,
  creatorResponseValidationSchema,
};