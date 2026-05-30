import { Schema, model } from "mongoose";
import { IReaction } from "./reaction.interface";

const reactionSchema = new Schema<IReaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


reactionSchema.index(
  { user: 1, post: 1 },
  { unique: true }
);

export const Reaction = model<IReaction>(
  "Reaction",
  reactionSchema
);