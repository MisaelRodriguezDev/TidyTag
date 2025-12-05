import {z} from "zod";

// Employee schema
export const EmployeeSchema = z.object({
  username: z.string().max(50),
  email: z.string().email().max(100),
  password: z.string().max(100),
  companyId: z.uuid(),
});

export const EmployeeSchemaUpdate = EmployeeSchema.partial()