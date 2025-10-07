import { z } from "zod";

// Esquema para crear un producto
export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  category: z.string().optional(),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  quantity: z.number().int().min(0, "La cantidad debe ser un entero >= 0"),
  barcode: z.string().min(1, "El código de barras es obligatorio"),
});

// Esquema para actualizar un producto
export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().int().min(0).optional(),
  barcode: z.string().min(1).optional(),
});

// Tipos TypeScript derivados
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
