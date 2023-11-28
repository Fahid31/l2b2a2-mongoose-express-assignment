import { Model } from "mongoose";

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
};

export type UserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<boolean>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
