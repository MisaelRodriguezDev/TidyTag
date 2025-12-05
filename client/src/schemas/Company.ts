import {z} from 'zod'
import commonSchema from './common'

export const createCompanySchema = z.object({
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    ownerId: z.uuid()
})

export const updateCompanySchema = createCompanySchema.partial()

export const companySchema = commonSchema.extend(createCompanySchema.shape)

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type Company = z.infer<typeof companySchema>;