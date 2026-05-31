import AppError from "../../utils/AppError";

import { Post } from "../post/post.model";
import { Reaction } from "./reaction.model";
import { validateObjectId } from "../../utils/validateObjectId";

const addReactionIntoDB = async (
  postId: string,
  userId: string
) => {

  if (!validateObjectId(postId)) {
  throw new AppError(400, "Invalid post id");
}
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new AppError(404, "Post not found");
  }

  const existingReaction =
    await Reaction.findOne({
      user: userId,
      post: postId,
    });

  if (existingReaction) {
    throw new AppError(
      409,
      "You already liked this post"
    );
  }

  return await Reaction.create({
    user: userId,
    post: postId,
  });
};

const removeReactionFromDB = async (
  postId: string,
  userId: string
) => {

  if (!validateObjectId(postId)) {
  throw new AppError(400, "Invalid post id");
}
  const reaction =
    await Reaction.findOneAndDelete({
      user: userId,
      post: postId,
    });

  if (!reaction) {
    throw new AppError(
      404,
      "Reaction not found"
    );
  }

  return reaction;
};

const getReactionCountFromDB = async (
  postId: string
) => {
  if (!validateObjectId(postId)) {
  throw new AppError(400, "Invalid post id");
}
  const count = await Reaction.countDocuments({
    post: postId,
  });

  return {
    count,
  };
};

export const ReactionServices = {
  addReactionIntoDB,
  removeReactionFromDB,
  getReactionCountFromDB,
};