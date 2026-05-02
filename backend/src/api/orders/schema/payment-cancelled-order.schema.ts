import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const paymentCancelledOrderSchema = vine.object({
    razorpay_order_id: vine.string().minLength(1).maxLength(255),
    order_id: vine.string().minLength(1).maxLength(255),
})

export type PaymentCancelledOrderDto = Infer<typeof paymentCancelledOrderSchema>

export const paymentCancelledOrderDtoValidator = vine.create(paymentCancelledOrderSchema)
