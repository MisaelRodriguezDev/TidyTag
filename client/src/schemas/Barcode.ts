import { z } from 'zod'

export const productByBarcodeSchema = z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    barcode: z.string()
})

export type ProductByBarcode = z.infer<typeof productByBarcodeSchema>;
