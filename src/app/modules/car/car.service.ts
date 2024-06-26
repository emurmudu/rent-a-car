import mongoose from "mongoose";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";



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


const updateCarFromDB = async(_id:string, update:object)=>{
    const result = await Car.findByIdAndUpdate(_id, update, {new : true});
    return result;
}



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





export const CarServices ={
    createCarIntoDB,
    getAllAcarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,

    
}