import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { AdminServices } from "./admin.service";

const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const result =
      await AdminServices.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);



const blockUser = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await AdminServices.blockUserIntoDB(
        req.params.id as string,
        req.user!.userId
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User blocked successfully",
      data: result,
    });
  }
);

const unblockUser = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await AdminServices.unblockUserIntoDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User unblocked successfully",
      data: result,
    });
  }
);

const getDashboardStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const result =
      await AdminServices.getDashboardStatsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Dashboard statistics retrieved successfully",
      data: result,
    });
  }
);

export const AdminControllers = {
  getAllUsers,
  blockUser,
  unblockUser,
  getDashboardStats,
};