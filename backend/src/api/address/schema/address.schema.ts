import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const addressSchema = vine.object({
    firstName: vine.string().minLength(3).maxLength(255),
    lastName: vine.string().minLength(3).maxLength(255),
    phoneNumber: vine.string().minLength(10).maxLength(10).regex(/^[0-9]+$/),
    country: vine.string().minLength(3).maxLength(255),
    city: vine.string().minLength(3).maxLength(255),
    state: vine.string().minLength(3).maxLength(255),
    postalCode: vine.string().minLength(6).maxLength(6).regex(/^[0-9]+$/),
    address: vine.string().minLength(3).maxLength(255),
    address2: vine.string().minLength(3).maxLength(255).optional(),
    companyName: vine.string().minLength(3).maxLength(255).optional(),
    addressType: vine.string().minLength(3).maxLength(255).in(['Home', 'Work']),
})

export type AddressDto = Infer<typeof addressSchema>

export const addressDtoValidator = vine.create(addressSchema)
