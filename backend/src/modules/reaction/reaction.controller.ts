import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { ReactionServices } from "./reaction.service";

const addReaction = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;
    const result =
      await ReactionServices.addReactionIntoDB(
        postId,
        req.user.userId
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Post liked successfully",
      data: result,
    });
  }
);

const removeReaction = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;
    const result =
      await ReactionServices.removeReactionFromDB(
        postId,
        req.user.userId
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Reaction removed successfully",
      data: result,
    });
  }
);

const getReactionCount = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;
    const result =
      await ReactionServices.getReactionCountFromDB(
        postId
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Reaction count retrieved",
      data: result,
    });
  }
);

export const ReactionControllers = {
  addReaction,
  removeReaction,
  getReactionCount,
};