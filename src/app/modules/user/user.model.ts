import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';
import { USER_ROLE } from "./user.constant";



const UserSchema = new Schema<TUser, UserModel>({
    name: {type: String, unique:true, required:true, trim:true},
    email: {type: String, unique: true, required: true, trim:true},
    // role: { type: String, enum: ['user', 'admin'], required: true },
    role: { type: String,  enum: Object.keys(USER_ROLE), required: true },
     password: {type : String, required: true, trim:true, select:0},
     phone: {type: String, required: true, trim:true},
     address: {type: String, required: true, trim:true},
     

}, 
{timestamps:true}
)


// hashed password
UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });



  UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });



  UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
  };


UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};



UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashTextPassword
) {
  return await bcrypt.compare(plainTextPassword, hashTextPassword);
};


export const User = model<TUser, UserModel>("User", UserSchema);
