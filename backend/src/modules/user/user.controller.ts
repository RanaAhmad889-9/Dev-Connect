import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { UserServices } from "./user.service";


const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await UserServices.getUserProfileFromDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: result,
    });
  }
);



const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await UserServices.updateProfileIntoDB(
        req.user.userId,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Profile updated successfully",
      data: result,
    });
  }
);


const getMyPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await UserServices.getMyPostsFromDB(
        req.user.userId
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Posts retrieved successfully",
      data: result,
    });
  }
);


const getUserPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await UserServices.getUserPostsFromDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Posts retrieved successfully",
      data: result,
    });
  }
);


export const UserControllers = {
  getUserProfile,
  updateProfile,
  getMyPosts,
  getUserPosts,
};