import mongoose from "mongoose";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "../booking/booking.model";
// import { JwtPayload } from "jsonwebtoken";



const createCarIntoDB = async (payload: TCar)=>{
    const result = await Car.create(payload);
    return result;
}


const getAllAcarsFromDB = async ()=>{
    const result = await Car.find();
    return result;
}


const getSingleCarFromDB = async(id:string)=>{
    const result = await Car.findById(id);
    return result;
}


const updateCarIntoDB = async(_id:string, update:object)=>{
    const result = await Car.findByIdAndUpdate(_id, update, {new : true});
    return result;  
}


const getCarById = async (_id: string) => {
  const car = await Car.findById(_id);
  return car;
};



const deleteCarFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const deletedCar = await Car.findByIdAndUpdate(
         id ,
        { isDeleted: true },
        { new: true, session },
      );

      if (!deletedCar) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete car');
      }
      await session.commitTransaction();
      await session.endSession();
      return deletedCar;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete car');
    }
  };



const returnCarIntoDB = async (bookingId: string, endTime: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) throw new AppError(httpStatus.NOT_FOUND, "Booking not found");

    const car = await Car.findById(booking.car).session(session);
    if (!car) throw new AppError(httpStatus.NOT_FOUND, "Car not found");

    const startTime = new Date(`${booking.date}T${booking.startTime}`);
    const endDateTime = new Date(`${booking.date}T${endTime}`);
    const duration = (endDateTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalCost = duration * car.pricePerHour;

    await Car.findByIdAndUpdate(
      car._id,
      { status: "available" },
      { new: true, session }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { endTime, totalCost },
      { new: true, session }
    ).populate("car").populate("user");

    await session.commitTransaction();
    session.endSession();

    return updatedBooking;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};


  

export const CarServices ={
    createCarIntoDB,
    getAllAcarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
    returnCarIntoDB,
    getCarById,
    

    
}