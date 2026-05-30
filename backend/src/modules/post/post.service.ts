import AppError from "../../utils/AppError";

import { UserRole } from "../auth/auth.interface";

import { Post } from "./post.model";

type TCreatePost = {
  content: string;
  image?: string;
  visibility?: "public" | "private";
};

type TUpdatePost = {
  content?: string;
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
  })
    .populate("author", "name email avatar")
    .sort("-createdAt");

  return result;
};

const getSinglePostFromDB = async (
  postId: string,
  userId?: string,
  role?: UserRole
) => {
  const post = await Post.findOne({
    _id: postId,
    isDeleted: false,
  }).populate("author", "name email avatar");

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  
  if (post.visibility === "private") {
    const isOwner =
      post.author._id.toString() === userId;

    const isAdmin = role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(403, "Forbidden access");
    }
  }

  return post;
};

const updatePostIntoDB = async (
  postId: string,
  payload: TUpdatePost,
  userId: string,
  role: UserRole
) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new AppError(404, "Post not found");
  }

  const isOwner =
    post.author.toString() === userId;

  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      403,
      "You are not authorized"
    );
  }

  const result = await Post.findByIdAndUpdate(
    postId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate("author", "name email avatar");

  return result;
};

const deletePostFromDB = async (
  postId: string,
  userId: string,
  role: UserRole
) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new AppError(404, "Post not found");
  }

  const isOwner =
    post.author.toString() === userId;

  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      403,
      "You are not authorized"
    );
  }

  const result = await Post.findByIdAndUpdate(
    postId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
};