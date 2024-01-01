import {z} from 'zod';

export const authSchema = z.object({
    username: z.string().min(1, {message: 'Username field is required'}),
    password: z.string().min(1, {message: 'Password field is required'}),
    remember_me: z.boolean()
});
