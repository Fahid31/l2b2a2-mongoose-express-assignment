import { UpdateQuery } from "mongoose";
import { TUser } from "./user.interface";
import { User } from "../user.model";
import { TOrder } from "./user.interface";

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
  const user = new User();
  const userExists = await user.isUserExists(userId);

  if (!userExists) {
    throw new Error("User not found");
  }
  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return result;
};

const deleteAUserFromDB = async (userId: number) => {
  const user = new User();
  const userExists = await user.isUserExists(userId);

  if (!userExists) {
    throw new Error("User not found");
  }
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const addProductToOrderDB = async (userId: number, orderData: TOrder) => {
  const user = new User();
  const userExists = await user.isUserExists(userId);

  if (!userExists) {
    throw new Error("User not found");
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true }
  );
  console.log(result);
  return result;
};

const FetchOrdersForASpecificUserDB = async (userId: number) => {
    const user = new User();
    const userExists = await user.isUserExists(userId);
    if (!userExists) {
      throw new Error('User not found')
    }
    const result = await User.findOne({ userId }).select('orders')
    return result
  }
  
  
  const FetchTheOverallPriceOfUsersOrderDB = async (userId: number) => {
    const user = new User();
    const userExists = await user.isUserExists(userId);
    if (!userExists) {
      throw new Error('User not found')
    }
    const result = await User.findOne({ userId }, { 'orders.price': 1, _id: 0 });
  
    if (!result || !result.orders || result.orders.length === 0) {
      return 0;
    }
  
    const totalPrice = result.orders.reduce((sum, order) => sum + order.price, 0);
    return totalPrice;
  
  }

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateASingleUserFromDB,
  deleteAUserFromDB,
  addProductToOrderDB,
  FetchOrdersForASpecificUserDB,
  FetchTheOverallPriceOfUsersOrderDB
};
