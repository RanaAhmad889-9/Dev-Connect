import AppError from "../../utils/AppError";
import generateToken from "../../utils/generateToken";

import { env } from "../../config/env";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";


type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

type TLoginUser = {
  email: string;
  password: string;
};

const registerUserIntoDB = async (payload: TRegisterUser) => {
 
  const existingUser = await User.isUserExistsByEmail(payload.email);

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }


  const result = await User.create(payload);

  return result;
};

const getMe = async (userId: string) => {
  const result = await User.findById(userId).select("-password");
   
  if (!result) {
    throw new AppError(404, "User not found");
  }


  return result;
};

const loginUser=async (payload:TLoginUser)=>{
  const user = await User.isUserExistsByEmail(payload.email);
  
  if(!user){
    throw new AppError(401, "Invalid credentials");
  }

  if (user.isBlocked) {
    throw new AppError(403, "User is blocked");
  }

  const isPasswordMatched=await user.isPasswordMatched(payload.password);

    if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  const jwtPayload={
    userId:user._id.toString(),
    email:user.email,
    role:user.role,
  };

const accessToken=generateToken(jwtPayload,
  env.JWT_ACCESS_SECRET,
  env.JWT_ACCESS_EXPIRES_IN
);

return {
    accessToken,
  };


}

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  getMe
};