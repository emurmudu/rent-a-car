import { TCar } from "./car.interface";
import { CarModel } from "./car.model";



const createCarIntoDB = async (payload: TCar)=>{
    const result = await CarModel.create(payload);
    return result;
}

const getAllAcarsFromDB = async ()=>{
    const result = await CarModel.find();
    return result;
}

const getSingleCarFromDB = async(id:string)=>{
    const result = await CarModel.findById(id);
    return result;
}




export const CarServices ={
    createCarIntoDB,
    getAllAcarsFromDB,
    getSingleCarFromDB,

    
}