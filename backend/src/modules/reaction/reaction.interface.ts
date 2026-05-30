import { Document, Types } from "mongoose";

export interface IReaction extends Document {
  user: Types.ObjectId;
  post: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}