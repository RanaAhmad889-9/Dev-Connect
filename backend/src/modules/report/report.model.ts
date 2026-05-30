import { Schema, model } from "mongoose";

import { IReport } from "./report.interface";

const reportSchema = new Schema<IReport>(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "resolved",
        "rejected",
      ],
      default: "pending",
    },

    adminMessage: {
      type: String,
      default: "",
    },

    creatorResponse: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ post: 1 });
reportSchema.index({ reporter: 1 });
reportSchema.index({ status: 1 });

export const Report = model<IReport>(
  "Report",
  reportSchema
);