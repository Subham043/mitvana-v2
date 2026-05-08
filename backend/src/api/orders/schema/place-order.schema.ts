import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const placeOrderSchema = vine.object({
    address_id: vine.string().minLength(1).maxLength(255),
    coupon_code: vine.string().optional(),
    order_note: vine.string().optional(),
    order_items: vine.array(
        vine.object({
            product_id: vine.string().minLength(1).maxLength(255),
            quantity: vine.number().positive().min(1),
        })
    ),
})

export type PlaceOrderDto = Infer<typeof placeOrderSchema>

export const placeOrderDtoValidator = vine.create(placeOrderSchema)
