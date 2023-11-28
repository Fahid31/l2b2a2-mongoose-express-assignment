"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TOrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(2),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const TUserFullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => value.charAt(0).toUpperCase() === value.charAt(0), {
        message: '{VALUE} is not capitalized format',
    }),
    lastName: zod_1.z.string().max(20).min(1).refine((value) => /^[A-Za-z]+$/.test(value), {
        message: '{VALUE} is not valid',
    }),
});
const TUserAddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().refine(value => value !== undefined, { message: 'User ID must required' }),
    username: zod_1.z.string().refine(value => value !== undefined, { message: 'Username is required' }),
    password: zod_1.z.string().max(20).min(6).refine(value => value !== undefined, { message: 'Password is required' }),
    fullName: TUserFullNameValidationSchema,
    age: zod_1.z.number().refine(value => value !== undefined, { message: 'Age is required' }),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().refine(value => value !== undefined, { message: 'isActive is required' }),
    hobbies: zod_1.z.array(zod_1.z.string()).refine(value => value !== undefined && value.length > 0, { message: 'Hobbies are required' }),
    address: TUserAddressValidationSchema,
    isDeleted: zod_1.z.boolean().default(false),
    orders: zod_1.z.array(TOrderValidationSchema).optional(),
});
exports.default = UserValidationSchema;
