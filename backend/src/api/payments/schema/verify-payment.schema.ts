import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const verifyRazorpayPaymentSchema = vine.object({
    razorpay_order_id: vine.string().minLength(1).maxLength(255),
    razorpay_payment_id: vine.string().minLength(1).maxLength(255),
    razorpay_signature: vine.string().minLength(1).maxLength(255),
})

export type VerifyRazorpayPaymentDto = Infer<typeof verifyRazorpayPaymentSchema>

export const verifyRazorpayPaymentDtoValidator = vine.create(verifyRazorpayPaymentSchema)
