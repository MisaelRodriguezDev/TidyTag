import { z } from "zod";

// Plan schema
export const PlanSchema = z.object({
  name: z.enum(["free", "basic", "pro"]),
  price: z.number().int().nonnegative(),
  maxUsers: z.number().int().nonnegative(),
  maxBusinesses: z.number().int().nullable().optional(),
  maxProducts: z.number().int().nonnegative(),
  description: z.string().max(255).optional(),
});

export const PlanSchemaUpdate = PlanSchema.partial()