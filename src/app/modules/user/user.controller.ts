
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";


const addUser = catchAsync(async(req, res) =>{
    const result = await UserServices.createUserIntoDB(req.body);
   
    sendResponse(res, {
        statusCode: httpStatus.OK, 
        success:true, 
        message: 'User registered successfully', 
        data: result,})
});



export const UserControllers ={
    addUser,
 

}
