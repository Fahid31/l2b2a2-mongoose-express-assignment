import { Schema, model } from 'mongoose';
import {
  User,
  UserAddress,
  UserFullName,
} from './userHandling/user.interface';

import validator from 'validator';
const UserFullNameSchema = new Schema<UserFullName>({
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

const UserAddressSchema = new Schema<UserAddress>({
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

const userSchema = new Schema<User>({
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
  },
  fullName: {
    type: UserFullNameSchema,
    required: [true ,'Full Name is required'],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid',
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
    type: UserAddressSchema,
    required: [true,'Address is required'],
  },
});
export const UserModel = model<User>('user', userSchema);