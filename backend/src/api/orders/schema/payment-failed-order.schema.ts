import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const paymentFailedOrderSchema = vine.object({
    razorpay_order_id: vine.string().minLength(1).maxLength(255),
    razorpay_payment_id: vine.string().minLength(1).maxLength(255),
    order_id: vine.string().minLength(1).maxLength(255),
})

export type PaymentFailedOrderDto = Infer<typeof paymentFailedOrderSchema>

export const paymentFailedOrderDtoValidator = vine.create(paymentFailedOrderSchema)
