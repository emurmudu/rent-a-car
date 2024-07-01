
import { NextFunction, Request, Response } from "express";
import { Tuser_role } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';



const Auth = (requiredRoles: Tuser_role) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route"));
    }

    const token = authToken.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

      if (requiredRoles && decoded.role !== requiredRoles) {
        return next(new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route"));
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route"));
    }
  });
};




export default Auth;