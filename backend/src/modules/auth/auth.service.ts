import AppError from "../../utils/AppError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";

const registerUserIntoDB = async (payload: IUser) => {
 
  const existingUser = await User.isUserExistsByEmail(payload.email);

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }


  const result = await User.create(payload);

  return result;
};

export const AuthServices = {
  registerUserIntoDB,
};