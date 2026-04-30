import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const applyCouponSchema = vine.object({
    coupon_code: vine.string().minLength(3).maxLength(255).trim(),
})

export type ApplyCouponDto = Infer<typeof applyCouponSchema>

export const applyCouponValidator = vine.create(applyCouponSchema)
