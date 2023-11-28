import { z } from 'zod';

const UserFullNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => value.charAt(0).toUpperCase() === value.charAt(0), {
            message: '{VALUE} is not capitalized format',
        }),
    lastName: z.string().max(20).min(1).refine((value) => /^[A-Za-z]+$/.test(value), {
        message: '{VALUE} is not valid',
    }),
});

const UserAddressValidationSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});

const UserValidationSchema = z.object({
    userId: z.number().refine(value => value !== undefined, { message: 'User ID must required' }),
    username: z.string().refine(value => value !== undefined, { message: 'Username is required' }),
    password: z.string().refine(value => value !== undefined, { message: 'Password is required' }),
    fullName: UserFullNameValidationSchema,
    age: z.number().refine(value => value !== undefined, { message: 'Age is required' }),
    email: z.string().email(),
    isActive: z.boolean().refine(value => value !== undefined, { message: 'isActive is required' }),
    hobbies: z.array(z.string()).refine(value => value !== undefined && value.length > 0, { message: 'Hobbies are required' }),
    address: UserAddressValidationSchema,
});

export default UserValidationSchema;