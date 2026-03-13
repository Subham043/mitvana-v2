import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const cartSchema = vine.object({
    product_id: vine.string().minLength(3).maxLength(255),
    quantity: vine.number().min(1),
    color_id: vine.string().minLength(3).maxLength(255).optional(),
})

export type CartDto = Infer<typeof cartSchema>

export const cartDtoValidator = vine.create(cartSchema)
