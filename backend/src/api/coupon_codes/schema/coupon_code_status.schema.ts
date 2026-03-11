import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const couponCodeStatusSchema = vine.object({
    is_draft: vine.boolean().optional(),
})

export type CouponCodeStatusDto = Infer<typeof couponCodeStatusSchema>

export const couponCodeStatusDtoValidator = vine.create(couponCodeStatusSchema)
