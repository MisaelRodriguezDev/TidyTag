import {z} from 'zod'
import commonSchema from './common'

export const createCategorySchema = z.object({
    name: z.string().min(2, "Debe tener almenos 2 caracteres").max(30, "Debe tener máximo 30 caracteres"),
    companyId: z.uuid(),
})

export const updateCategorySchema = createCategorySchema.partial()

export const categorySchema = commonSchema.extend(createCategorySchema.shape)

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type Category = z.infer<typeof categorySchema>;