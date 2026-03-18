import { z } from 'zod';

export const AddressSchema = z.object({
    first_name: z.string().min(3).max(255),
    last_name: z.string().min(3).max(255),
    phone_number: z.string().min(10).max(10).regex(/^[0-9]+$/),
    country: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    state: z.string().min(3).max(255),
    postal_code: z.number().gte(100000).lte(999999),
    address: z.string().min(3).max(255),
    address_2: z.union([z.string().min(3).max(255), z.literal('')]),
    company_name: z.union([z.string().min(3).max(255), z.literal('')]),
    address_type: z.enum(['Home', 'Work']),
})

export type AddressFormValuesType = z.infer<typeof AddressSchema>;