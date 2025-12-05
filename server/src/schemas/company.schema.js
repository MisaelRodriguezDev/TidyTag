import {z} from "zod";

// Company schema
export const CompanySchema = z.object({
  name: z.string().max(50),
  email: z.email().max(100),
  phone: z.string().max(13),
  ownerId: z.uuid(),
});

export const CompanySchemaUpdate = CompanySchema.partial()