import {z} from "zod";

// Product schema
export const ProductSchema = z.object({
  name: z.string().max(50),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  barcode: z.string().max(15),
  categoryId: z.uuid(),
  companyId: z.uuid(),
});

export const ProductSchemaUpdate = ProductSchema.partial()