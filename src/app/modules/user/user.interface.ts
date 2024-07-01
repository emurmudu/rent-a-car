
import { USER_ROLE } from './user.constant';
import { Model } from "mongoose";



export type TUser ={
 
    name: string;
    email: string;
    role: 'user' | 'admin';
    // role: Tuser_role;
    password: string;
    phone: string;
    address: string;
   
  }
  

  export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedTextPassword: string
    ): Promise<boolean>;
  }
  
  export type Tuser_role = keyof typeof USER_ROLE;
  