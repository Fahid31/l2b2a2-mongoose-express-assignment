import { UserModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (student: User) => {
    const result = await UserModel.create(student);
    return result;
  };
  
  export const userServices = {
    createUserIntoDB,
  }