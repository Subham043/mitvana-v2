import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const couponCodeFilterSchema = vine.object({
    is_draft: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type CouponCodeFilterDto = Infer<typeof couponCodeFilterSchema>

export const couponCodeFilterDtoValidator = vine.create(couponCodeFilterSchema)