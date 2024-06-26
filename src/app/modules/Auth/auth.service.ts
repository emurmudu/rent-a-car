


// export const createUserIntoDB = async (user: TUser): Promise<TUser> => {
//     const result = await User.create(user);
//     return result.toObject();
//   };

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
// import { createToken } from "./auth.utils";
import config from "../../config";
import jwt from 'jsonwebtoken';
import { createToken } from "./auth.utils";


  // const register = async (payload: TUser) => {
  //   const user = await User.findOne({ email: payload.email });
  //   if (user) {
  //     throw new AppError(httpStatus.CONFLICT, "User already exists");
  //   }

  //   payload.role = payload.role;
  //   const newUser = await User.create(payload);
  //   return newUser;
  // };


  const register = async (userData: TUser) => {
   // checking if the user already exists
   const existingUser = await User.findOne({ email: userData.email });
   console.log(existingUser);
   if (existingUser) {
     throw new AppError(httpStatus.NOT_FOUND, "User already Exists!!");
   }
   const newUser = new User(userData);
   console.log(`newUser`);
   const result = await newUser.save();
   return result;
 };




 const loginUser = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_EXTENDED, "This User not found");
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "wrong password !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d"
  );
  const token = `Bearer ${accessToken}`;

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "365d"
  );
  return {
    token,
    refreshToken,
    user,
  };
};
  export const AuthServices = {
    register,
    loginUser,
  };