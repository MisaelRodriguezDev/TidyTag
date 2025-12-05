import { z } from "zod";

// User schema
export const UserSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(150),
  email: z.email().max(100),
  password: z.string(),
  imageUrl: z.url().optional(),
  isConfirmed: z.boolean().optional(),
});

export const UserSchemaUpdate = UserSchema.partial()