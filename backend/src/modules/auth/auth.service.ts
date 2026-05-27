import { IUser } from "./auth.interface";
import { User } from "./auth.model";

const registerUserIntoDB = async (payload: IUser) => {
  // check existing user
  const existingUser = await User.isUserExistsByEmail(payload.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const result = await User.create(payload);

  return result;
};

export const AuthServices = {
  registerUserIntoDB,
};