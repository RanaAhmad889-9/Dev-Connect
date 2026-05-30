import { Schema, model } from "mongoose";
import { IPost } from "./Post.interface";

const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
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

export const Post= model<IPost>("Post",postSchema);