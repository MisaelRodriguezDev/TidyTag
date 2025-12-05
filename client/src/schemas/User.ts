import { z } from 'zod'
import commonSchema from './common'

export const createUserSchema = z.object({
    firstName: z.string().min(5).max(100),
    lastName: z.string().min(5).max(150),
    email: z.string().min(5).max(100),
    password: z.string()
})

export const updateUserSchema = createUserSchema.partial()

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const userSchema = commonSchema.extend(createUserSchema.shape)

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type User = z.infer <typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;