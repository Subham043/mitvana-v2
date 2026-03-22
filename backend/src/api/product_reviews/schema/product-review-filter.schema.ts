import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const productReviewFilterSchema = vine.object({
    status: vine.string().minLength(3).maxLength(255).in(['approved', 'rejected', 'pending']).optional(),
    ...paginationSchema.getProperties(),
})

export type ProductReviewFilterDto = Infer<typeof productReviewFilterSchema>

export const productReviewFilterDtoValidator = vine.create(productReviewFilterSchema)
