import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { CommentServices } from "./comment.service";

const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const postId =
      req.params.postId as string;

    const result =
      await CommentServices.createCommentIntoDB(
        postId,
        req.user.userId,
        req.body.content
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Comment created successfully",
      data: result,
    });
  }
);

const getComments = asyncHandler(
  async (req: Request, res: Response) => {
    const postId =
      req.params.postId as string;

    const result =
      await CommentServices.getCommentsFromDB(
        postId
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Comments retrieved successfully",
      data: result,
    });
  }
);

const updateComment = asyncHandler(
  async (req: Request, res: Response) => {
    const commentId =
      req.params.commentId as string;

    const result =
      await CommentServices.updateCommentIntoDB(
        commentId,
        req.body,
        req.user.userId,
        req.user.role
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Comment updated successfully",
      data: result,
    });
  }
);

const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const commentId =
      req.params.commentId as string;

    const result =
      await CommentServices.deleteCommentFromDB(
        commentId,
        req.user.userId,
        req.user.role
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Comment deleted successfully",
      data: result,
    });
  }
);

export const CommentControllers = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};