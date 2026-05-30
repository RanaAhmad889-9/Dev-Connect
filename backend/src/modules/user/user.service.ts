import AppError from "../../utils/AppError";
import { User } from "../auth/auth.model";
import { Post } from "../post/post.model";


const getUserProfileFromDB = async (
  userId: string
) => {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const updateProfileIntoDB = async (
  userId: string,
  payload: {
    name?: string;
    avatar?: string;
    coverPhoto?: string;
    bio?: string;
  }
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  return result;
};


const getMyPostsFromDB = async (
  userId: string
) => {
  return await Post.find({
    author: userId,
    isDeleted: false,
  }).sort("-createdAt");
};


const getUserPostsFromDB = async (
  userId: string
) => {
  return await Post.find({
    author: userId,
    visibility: "public",
    isDeleted: false,
  }).sort("-createdAt");
};


export const UserServices = {
  getUserProfileFromDB,
  updateProfileIntoDB,
  getMyPostsFromDB,
  getUserPostsFromDB,
};