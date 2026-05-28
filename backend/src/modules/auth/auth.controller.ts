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

const loginUser=asyncHandler(async (req:Request, res:Response)=>{
  const result=await AuthServices.loginUser(req.body);

  sendResponse(res,{
    success:true,
    statusCode:200,
    message:"Login Successful",
    data:result
  })
})

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.getMe(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
    getMe,
};