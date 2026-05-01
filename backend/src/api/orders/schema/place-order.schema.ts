import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const placeOrderSchema = vine.object({
    address_id: vine.string().minLength(1).maxLength(255),
    order_note: vine.string().optional(),
})

export type PlaceOrderDto = Infer<typeof placeOrderSchema>

export const placeOrderDtoValidator = vine.create(placeOrderSchema)
