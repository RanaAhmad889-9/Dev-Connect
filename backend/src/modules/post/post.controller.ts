import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { PostServices } from "./post.service";

const createPost = asyncHandler(async (req: Request, res: Response) => {
  const result = await PostServices.createPostIntoDB(
    req.body,
    req.user.userId
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = asyncHandler(async (_req: Request, res: Response) => {
  const result = await PostServices.getAllPostsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const getSinglePost = asyncHandler(
  async (req: Request, res: Response) => {

    const postId = req.params.id as string;
    const result = await PostServices.getSinglePostFromDB(
        postId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Post retrieved successfully",
      data: result,
    });
  }
);

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
};