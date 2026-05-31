import AppError from "../../utils/AppError";

import { User } from "../auth/auth.model";
import { Post } from "../post/post.model";
import { Comment } from "../comment/comment.model";
import { Report } from "../report/report.model";
import { validateObjectId } from "../../utils/validateObjectId";



const getAllUsersFromDB = async () => {
  return await User.find()
    .select("-password")
    .sort("-createdAt");
};


const blockUserIntoDB = async (
  userId: string,
  adminId: string
) => {
if (!validateObjectId(userId)) {
  throw new AppError(400, "Invalid user id");

}

if (userId === adminId) {
  throw new AppError(
    400,
    "You cannot block yourself"
  );
}
const user = await User.findById(userId);

if (!user) {
  throw new AppError(404, "User not found");
}

if (user.isBlocked) {
  throw new AppError(
    400,
    "User already blocked"
  );
}

  user.isBlocked = true;

  await user.save();

  return user;
};


const unblockUserIntoDB = async (
  userId: string
) => {

  if (!validateObjectId(userId)) {
  throw new AppError(400, "Invalid user id");
}
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.isBlocked) {
  throw new AppError(
    400,
    "User already active"
  );
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