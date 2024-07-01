import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";



  const registerUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const result = await AuthServices.register(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: result,
    });
  });



  const userLogin = catchAsync(async (req, res) => {
    const { refreshToken, token, user } = await AuthServices.signUp(
      req.body
    );

    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: user,
      token: token,
      
    });
  });
  
  
  export const AuthControllers = {
    registerUser,
    userLogin,
  };
  