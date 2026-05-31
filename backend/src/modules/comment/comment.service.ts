import AppError from "../../utils/AppError";

import { UserRole } from "../auth/auth.interface";
import { Post } from "../post/post.model";

import { Comment } from "./comment.model";

import { validateObjectId } from "../../utils/validateObjectId";

const createCommentIntoDB = async (
  postId: string,
  userId: string,
  content: string
) => {
  if (!validateObjectId(postId)) {
  throw new AppError(400, "Invalid post id");
}
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new AppError(404, "Post not found");
  }

  return await Comment.create({
    author: userId,
    post: postId,
    content,
  });
};

const getCommentsFromDB = async (
  postId: string
) => {

  if (!validateObjectId(postId)) {
  throw new AppError(400, "Invalid post id");
}
  return await Comment.find({
    post: postId,
    isDeleted: false,
  })
    .populate("author", "name avatar")
    .sort("-createdAt");


};

const updateCommentIntoDB = async (
  commentId: string,
  payload: { content?: string },
  userId: string,
  role: UserRole
) => {

if (!validateObjectId(commentId)) {
  throw new AppError(400, "Invalid comment id");
}
  const comment =
    await Comment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new AppError(
      404,
      "Comment not found"
    );
  }

  const isOwner =
    comment.author.toString() === userId;

  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      403,
      "You are not authorized"
    );
  }

  const result =
    await Comment.findByIdAndUpdate(
      commentId,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return result;
};

const deleteCommentFromDB = async (
  commentId: string,
  userId: string,
  role: UserRole
) => {

  if (!validateObjectId(commentId)) {
  throw new AppError(400, "Invalid comment id");
}
  const comment =
    await Comment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new AppError(
      404,
      "Comment not found"
    );
  }

  const isOwner =
    comment.author.toString() === userId;

  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      403,
      "You are not authorized"
    );
  }

  return await Comment.findByIdAndUpdate(
    commentId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

export const CommentServices = {
  createCommentIntoDB,
  getCommentsFromDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
};