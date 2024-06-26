
import { NextFunction, Request, Response } from "express";
import { Tuser_role } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';




// const Auth = (...requiredRoles: Tuser_role[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You have no access to this route"
//       );
//     }

//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string
//     ) as JwtPayload;
    
//     const role = decoded.role;
//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You have no access to this route"
//       );
//     }
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };






const Auth = (requiredRole: Tuser_role) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // check if the token send client

    if (!authHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!!");
    }

    const token = authHeader.split("Bearer ")[1];

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not Authorized!!"
          );
        }
        const user = decoded as JwtPayload;

        if (requiredRole && user.role !== requiredRole) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You have no access to this route!!"
          );
        }

        //decoded
        req.user = user;
        next();
      }
    );
  });
};



export default Auth;