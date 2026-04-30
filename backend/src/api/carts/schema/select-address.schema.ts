import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const selectAddressSchema = vine.object({
    address_id: vine.string().minLength(3).maxLength(255).trim(),
})

export type SelectAddressDto = Infer<typeof selectAddressSchema>

export const selectAddressValidator = vine.create(selectAddressSchema)
