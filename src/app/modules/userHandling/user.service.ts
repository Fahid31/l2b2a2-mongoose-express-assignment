import { UpdateQuery } from "mongoose";
import { TUser } from "./user.interface";
import { User } from "../user.model";

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select("-password");
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = new User();
  const userExists = await user.isUserExists(userId);

  if (!userExists) {
    throw new Error("User not found");
  }

  const result = await User.findOne({ userId }).select("-password");
  return result;
};

const updateASingleUserFromDB = async (
  userId: number,
  updatedData: UpdateQuery<TUser> | undefined
) => {
  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateASingleUserFromDB,
};
