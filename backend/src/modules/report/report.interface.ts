import { Document, Types } from "mongoose";

export type ReportStatus =
  | "pending"
  | "reviewing"
  | "resolved"
  | "rejected";

export interface IReport extends Document {
  reporter: Types.ObjectId;

  post: Types.ObjectId;

  reason: string;

  status: ReportStatus;

  adminMessage?: string;

  creatorResponse?: string;

  createdAt?: Date;
  updatedAt?: Date;
}