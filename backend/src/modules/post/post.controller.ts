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
  const { meta, result } =
  await PostServices.getAllPostsFromDB(
    _req.query as Record<string, any>
  );

  sendResponse(res, {
  success: true,
  statusCode: 200,
  message: "Posts retrieved successfully",
  meta,
  data: result,
});
});

const getSinglePost = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;

    const result = await PostServices.getSinglePostFromDB(
      postId,
      req.user?.userId,
      req.user?.role
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Post retrieved successfully",
      data: result,
    });
  }
);


const updatePost = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;

    const result = await PostServices.updatePostIntoDB(
      postId,
      req.body,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Post updated successfully",
      data: result,
    });
  }
);

const deletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;

    const result = await PostServices.deletePostFromDB(
      postId,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Post deleted successfully",
      data: result,
    });
  }
);



export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};