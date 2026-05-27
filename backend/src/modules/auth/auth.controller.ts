import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

import { AuthServices } from "./auth.service";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
};