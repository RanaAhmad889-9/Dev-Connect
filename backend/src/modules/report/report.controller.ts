import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { ReportServices } from "./report.service";

const createReport = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.postId as string;

  const result = await ReportServices.createReportIntoDB(
    postId,
    req.user.userId,
    req.body.reason
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Report submitted successfully",
    data: result,
  });
});

const getAllReports = asyncHandler(async (_req: Request, res: Response) => {
  const result = await ReportServices.getAllReportsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Reports retrieved successfully",
    data: result,
  });
});

const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const reportId = req.params.id as string;

  const result = await ReportServices.updateReportStatusIntoDB(
    reportId,
    req.body.status
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Report status updated successfully",
    data: result,
  });
});

const addAdminMessage = asyncHandler(async (req: Request, res: Response) => {
  const reportId = req.params.id as string;

  const result = await ReportServices.addAdminMessageIntoDB(
    reportId,
    req.body.adminMessage
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin message added successfully",
    data: result,
  });
});

const addCreatorResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const reportId = req.params.id as string;

    const result = await ReportServices.addCreatorResponseIntoDB(
      reportId,
      req.body.creatorResponse,
      req.user.userId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Response submitted successfully",
      data: result,
    });
  }
);

export const ReportControllers = {
  createReport,
  getAllReports,
  updateStatus,
  addAdminMessage,
  addCreatorResponse,
};