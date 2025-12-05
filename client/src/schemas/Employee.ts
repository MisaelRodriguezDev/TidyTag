import {z} from 'zod'
import commonSchema from './common'

export const createEmployeeSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: z.string(),
    companyId: z.uuid(),
})

export const updateEmployeeSchema = createEmployeeSchema.partial()

export const employeeSchema = commonSchema.extend(createEmployeeSchema.shape)

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type Employee = z.infer<typeof employeeSchema>;