import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { ReportControllers } from "./report.controller";
import { ReportValidation } from "./report.validation";

const router = express.Router();

router.post(
  "/:postId",
  auth("user", "admin"),
  validateRequest(
    ReportValidation.createReportValidationSchema
  ),
  ReportControllers.createReport
);

router.get(
  "/",
  auth("admin"),
  ReportControllers.getAllReports
);

router.patch(
  "/:id/status",
  auth("admin"),
  validateRequest(
    ReportValidation.updateStatusValidationSchema
  ),
  ReportControllers.updateStatus
);

router.patch(
  "/:id/admin-message",
  auth("admin"),
  validateRequest(
    ReportValidation.adminMessageValidationSchema
  ),
  ReportControllers.addAdminMessage
);

router.patch(
  "/:id/response",
  auth("user", "admin"),
  validateRequest(
    ReportValidation.creatorResponseValidationSchema
  ),
  ReportControllers.addCreatorResponse
);

export const ReportRoutes = router;