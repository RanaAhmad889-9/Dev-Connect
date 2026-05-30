import AppError from "../../utils/AppError";

import { Post } from "./post.model";

type TCreatePost = {
  content: string;
  image?: string;
  visibility?: "public" | "private";
};

const createPostIntoDB = async (
  payload: TCreatePost,
  userId: string
) => {
  const result = await Post.create({
    ...payload,
    author: userId,
  });

  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find({
    isDeleted: false,
    visibility: "public",
  }).sort("-createdAt");

  return result;
};

const getSinglePostFromDB = async (postId: string) => {
  const result = await Post.findOne({
    _id: postId,
    isDeleted: false,
  });

  if (!result) {
    throw new AppError(404, "Post not found");
  }

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
};