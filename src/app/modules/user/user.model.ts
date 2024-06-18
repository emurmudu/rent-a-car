import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';



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


// hashed password
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });





  

export const UserModel = model<TUser>('User', userSchema);
