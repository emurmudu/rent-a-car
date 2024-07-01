
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



const getAllBookings = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookingServices.getAllBookingsFromDB(query);

  sendResponse (res, {
    success: true,
    statusCode: result.length < 1 ? httpStatus.NOT_FOUND : httpStatus.OK,
    message: result.length < 1 ? "No Data Found" : "Bookings retrieved successfully",
    data: result,
  });

});



const getMyBookings = catchAsync(async (req, res) => {
  const userEmail = req.user?.email;
  const result = await BookingServices.getMyBookingsFromDB(userEmail);


  sendResponse (res, {
    success: true,
    statusCode: result.length < 1 ? httpStatus.NOT_FOUND : httpStatus.OK,
    message: result.length < 1 ? "Data not found" : "My bookings retrieved successfully",
    data: result,
  });
});





  export const BookingControllers ={
    createBooking,
    getAllBookings,
    getMyBookings,
   
    


  }