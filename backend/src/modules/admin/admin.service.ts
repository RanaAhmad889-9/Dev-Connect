import AppError from "../../utils/AppError";

import { User } from "../auth/auth.model";
import { Post } from "../post/post.model";
import { Comment } from "../comment/comment.model";
import { Report } from "../report/report.model";


const getAllUsersFromDB = async () => {
  return await User.find()
    .select("-password")
    .sort("-createdAt");
};


const blockUserIntoDB = async (
  userId: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  user.isBlocked = true;

  await user.save();

  return user;
};


const unblockUserIntoDB = async (
  userId: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  user.isBlocked = false;

  await user.save();

  return user;
};

const getDashboardStatsFromDB = async () => {
  const totalUsers =
    await User.countDocuments();

  const totalPosts =
    await Post.countDocuments({
      isDeleted: false,
    });

  const totalComments =
    await Comment.countDocuments({
      isDeleted: false,
    });

  const totalReports =
    await Report.countDocuments();

  return {
    totalUsers,
    totalPosts,
    totalComments,
    totalReports,
  };
};


export const AdminServices = {
  getAllUsersFromDB,
  blockUserIntoDB,
  unblockUserIntoDB,
  getDashboardStatsFromDB,
};