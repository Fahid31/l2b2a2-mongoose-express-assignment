import { UserModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
