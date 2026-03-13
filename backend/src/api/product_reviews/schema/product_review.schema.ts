import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const productReviewSchema = vine.object({
    rating: vine.number().min(1).max(5),
    title: vine.string().minLength(3).maxLength(255),
    comment: vine.string().minLength(3).maxLength(500).optional(),
    product_id: vine.string().minLength(3).maxLength(255),
})

export type ProductReviewDto = Infer<typeof productReviewSchema>

export const productReviewDtoValidator = vine.create(productReviewSchema)
