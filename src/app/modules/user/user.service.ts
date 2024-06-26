
import { TUser } from "./user.interface";
import { User } from "./user.model";



export const createUserIntoDB = async (user: TUser): Promise<TUser> => {
  const result = await User.create(user);
  return result.toObject();
};





export const UserServices = {
  createUserIntoDB,
};
