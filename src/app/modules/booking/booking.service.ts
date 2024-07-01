import { JwtPayload } from 'jsonwebtoken';

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { Booking } from "./booking.model";
import mongoose from "mongoose";




const createBookingIntoDB = async (
  user: Record<string, unknown>,
  payload: JwtPayload
) => {
  const loggedInUser = await User.findOne({ email: user.email });
  
  if (!loggedInUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  payload.user = loggedInUser._id as mongoose.Types.ObjectId;
  payload.car = payload.carId;

  const car = await Car.findById(payload.carId);
  
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  if (car.status !== "available") {
    throw new AppError(httpStatus.BAD_REQUEST, "Car is not available");
  }

  await Car.updateOne(
    { _id: car._id },
    { $set: { status: "unavailable" } },
    { new: true, runValidators: true }
  );

  const result = (
        await (await Booking.create(payload)).populate("user")
      ).populate("car");

  return result;
};




const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {};

  if (query.carId) {
    filter.car = query.carId;
  }

  if (query.date) {
    filter.date = query.date;
  }

  const result = await Booking.find(filter).populate("car").populate("user");

  return result;
};




const getMyBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const userId = user._id;
  const bookings = await Booking.find({ user: userId }).populate("user").populate("car");

  return bookings;
};




  export const BookingServices ={
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,

  }