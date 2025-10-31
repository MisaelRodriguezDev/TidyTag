import { z } from 'zod'
import commonSchema from './common'

export const createUserSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string()
})

export const updateUserSchema = createUserSchema.partial()

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const userSchema = commonSchema.extend(createUserSchema.shape)

export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type User = z.infer <typeof userSchema>;