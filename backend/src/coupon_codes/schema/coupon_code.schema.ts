import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const couponCodeSchema = vine.object({
    code: vine.string().minLength(3).maxLength(255).alphaNumeric(),
    discount_percentage: vine.number().min(0).max(100),
    min_cart_value: vine.number().min(0),
    maximum_redemptions: vine.number().min(1),
    expiration_date: vine.date().afterOrEqual('today'),
})

export type CouponCodeDto = Infer<typeof couponCodeSchema>

export const couponCodeDtoValidator = vine.create(couponCodeSchema)
