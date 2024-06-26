import { UserModel } from './../user/user.interface';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";



const createBookingIntoDB = async (
  user: Record<string, unknown>,
  payload: TBooking
) => {
  const filterLoginUser = await User.findOne({ email: user.email });
  // console.log(filterLoginUser);
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  const newUser = filterLoginUser._id;
  payload.user = newUser as mongoose.Types.ObjectId;
  // console.log(payload);

  const filterCar = await Car.findOne({ _id: payload.carId });
  if (!filterCar) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not Found");
  }
  const { _id } = filterCar;
  const statusUpdateCar = await Car.findByIdAndUpdate(
    _id,
    {
      status: "unavailable",
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const result = (
    await (await Booking.create(payload)).populate("user")
  ).populate("carId");
  return result;
};



  export const BookingServices ={
    createBookingIntoDB,

  }