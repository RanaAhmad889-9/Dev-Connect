import AppError from "../../utils/AppError";

import { Post } from "../post/post.model";

import { ReportStatus } from "./report.interface";
import { Report } from "./report.model";

const createReportIntoDB = async (
  postId: string,
  userId: string,
  reason: string
) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new AppError(404, "Post not found");
  }

  return await Report.create({
    reporter: userId,
    post: postId,
    reason,
  });
};

const getAllReportsFromDB = async () => {
  return await Report.find()
    .populate("reporter", "name email")
    .populate("post")
    .sort("-createdAt");
};

const updateReportStatusIntoDB = async (
  reportId: string,
  status: ReportStatus
) => {
  const report =
    await Report.findById(reportId);

  if (!report) {
    throw new AppError(
      404,
      "Report not found"
    );
  }

  if (status === "resolved") {
    await Post.findByIdAndUpdate(
      report.post,
      {
        isDeleted: true,
      }
    );
  }

  return await Report.findByIdAndUpdate(
    reportId,
    { status },
    { new: true }
  );
};

const addAdminMessageIntoDB = async (
  reportId: string,
  adminMessage: string
) => {
  const report =
    await Report.findById(reportId);

  if (!report) {
    throw new AppError(
      404,
      "Report not found"
    );
  }

  return await Report.findByIdAndUpdate(
    reportId,
    {
      adminMessage,
      status: "reviewing",
    },
    { new: true }
  );
};

const addCreatorResponseIntoDB = async (
  reportId: string,
  creatorResponse: string,
  userId: string
) => {
  const report =
    await Report.findById(reportId)
      .populate("post");

  if (!report) {
    throw new AppError(
      404,
      "Report not found"
    );
  }

  const post: any = report.post;

  if (
    post.author.toString() !== userId
  ) {
    throw new AppError(
      403,
      "Forbidden access"
    );
  }

  return await Report.findByIdAndUpdate(
    reportId,
    {
      creatorResponse,
    },
    { new: true }
  );
};

export const ReportServices = {
  createReportIntoDB,
  getAllReportsFromDB,
  updateReportStatusIntoDB,
  addAdminMessageIntoDB,
  addCreatorResponseIntoDB,
};