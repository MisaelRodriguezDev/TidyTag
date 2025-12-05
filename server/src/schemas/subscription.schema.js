import { z } from "zod";

// Subscription schema
export const SubscriptionSchema = z.object({
  userId: z.uuid(),
  companyId: z.uuid(),
  planId: z.uuid(),
  startDate: z.date().optional(),
  endDate: z.date().nullable().optional(),
  status: z.enum(["active", "cancelled", "expired"]).optional(),
});

export const SubscriptionSchemaUpdate = SubscriptionSchema.partial()