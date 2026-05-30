import { Schema, model } from "mongoose";

import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ post: 1 });

commentSchema.index({ author: 1 });

commentSchema.index({ createdAt: -1 });

export const Comment = model<IComment>(
  "Comment",
  commentSchema
);