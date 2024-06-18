import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";



const carSchema = new Schema<TCar>(
    {
      name: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      color: { type: String, required: true, trim: true },
      isElectric: { type: Boolean, required: true },
      status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
      features: { type: [String], required: true },
      pricePerHour: { type: Number, required: true },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );



  // Query Middleware
  carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
carSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await CarModel.findById({ id });
  return existingUser;
};




  
  export const CarModel = model<TCar>('Car', carSchema);