import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const getRazorpayPaymentInfoSchema = vine.object({
    razorpay_payment_id: vine.string().minLength(1).maxLength(255),
})

export type GetRazorpayPaymentInfoDto = Infer<typeof getRazorpayPaymentInfoSchema>

export const getRazorpayPaymentInfoDtoValidator = vine.create(getRazorpayPaymentInfoSchema)
