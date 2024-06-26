
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";




const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.createBookingIntoDB(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});


// const createBooking = catchAsync(async (req, res) => {
//   const booking = await BookingServices.createBookingIntoDB(req.body, req.user);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Car booked successfully",
//     data: booking,
//   });
// });






  export const BookingControllers ={
    createBooking,


  }