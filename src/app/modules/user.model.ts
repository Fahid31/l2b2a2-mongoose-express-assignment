import { Schema, model } from "mongoose";
import validator from "validator";
import {
  TOrder,
  TUser,
  TUserAddress,
  TUserFullName,
  UserMethods,
  UserModel,
} from "./userHandling/user.interface";
import bcrypt from "bcrypt";
import config from "../config";

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, "Product Name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Product Quantity is required"],
  },
});

const TUserFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const TUserAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: {
    type: TUserFullNameSchema,
    required: [true, "Full Name is required"],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not valid",
    },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: TUserAddressSchema,
    required: [true, "Address is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orders:{
    type:[orderSchema],
  }
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//query middleware
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middleware
userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.methods.isUserExists = async function (
  userId: number
): Promise<boolean> {
  const existingUser = await User.findOne({ userId });
  return !!existingUser;
};
export const User = model<TUser, UserModel>("user", userSchema);
