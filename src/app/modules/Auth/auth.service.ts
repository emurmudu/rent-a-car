
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
// import { createToken } from "./auth.utils";
import config from "../../config";
// import jwt from 'jsonwebtoken';
import { createToken } from "./auth.utils";




const register = async (userData: TUser) => {
    const userExists = await User.exists({ email: userData.email });

    if (userExists) {
      throw new AppError(httpStatus.CONFLICT, "User already exists.");
    }

    const newUser = await User.create(userData);
    return newUser;
};



const signUp = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isPasswordCorrect = await User.isPasswordMatched(payload.password, user.password);
  if (!isPasswordCorrect) throw new AppError(httpStatus.FORBIDDEN, "Wrong password!");

  const jwtPayload = { email: user.email, role: user.role };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, "10d");
  const token = `Bearer ${accessToken}`;
  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, "365d");

  return { token, accessToken, refreshToken, user };
};



  export const AuthServices = {
    register,
    signUp,
  };