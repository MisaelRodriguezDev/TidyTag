import {z} from 'zod'

const commonSchema = z.object({
    id: z.uuidv4(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export default commonSchema;