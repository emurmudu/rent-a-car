import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";



const userSchema = new Schema<TUser>({
    name: {type: String, required:true, trim:true},
    email: {type: String, required: true, trim:true},
    role: {type: String,
        enum: ['user', 'admin'], trim:true
     },
     password: {type : String, required: true, trim:true},
     phone: {type: String, required: true, trim:true},
     address: {type: String, required: true, trim:true}

}, 
{timestamps:true}
)

export const UserModel = model<TUser>('User', userSchema);
