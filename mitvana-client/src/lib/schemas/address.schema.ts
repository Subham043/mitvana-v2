import { z } from 'zod';

export const AddressSchema = z.object({
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    phoneNumber: z.string().min(10).max(10).regex(/^[0-9]+$/),
    country: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    state: z.string().min(3).max(255),
    postalCode: z.string().min(6).max(6).regex(/^[0-9]+$/),
    address: z.string().min(3).max(255),
    address2: z.union([z.string().min(3).max(255), z.literal('')]),
    companyName: z.union([z.string().min(3).max(255), z.literal('')]),
    addressType: z.enum(['Home', 'Office']),
})

export type AddressFormValuesType = z.infer<typeof AddressSchema>;