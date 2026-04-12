import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const addressSchema = vine.object({
    first_name: vine.string().minLength(3).maxLength(255),
    last_name: vine.string().minLength(3).maxLength(255),
    phone_number: vine.string().minLength(10).maxLength(10).regex(/^[0-9]+$/),
    country: vine.string().minLength(3).maxLength(255),
    city: vine.string().minLength(3).maxLength(255),
    state: vine.string().minLength(3).maxLength(255),
    postal_code: vine.number().min(100000).max(999999),
    address: vine.string().minLength(3).maxLength(255),
    address_2: vine.string().maxLength(255).optional(),
    company_name: vine.string().maxLength(255).optional(),
    address_type: vine.string().minLength(3).maxLength(255).in(['Home', 'Work']),
})

export type AddressDto = Infer<typeof addressSchema>

export const addressDtoValidator = vine.create(addressSchema)
