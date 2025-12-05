import {z} from "zod";

export const CategorySchema = z.object({
  name: z.string().max(30),
  companyId: z.uuid(),
});

export const CategorySchemaUpdate = CategorySchema.partial()