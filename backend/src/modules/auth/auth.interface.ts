import { Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  coverPhoto?: string;
  isBlocked: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}