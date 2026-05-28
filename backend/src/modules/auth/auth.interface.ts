import { Document,Model } from "mongoose";

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

  isPasswordMatched(
    plainTextPassword: string):Promise<boolean>;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string):Promise<IUser | null>;
}