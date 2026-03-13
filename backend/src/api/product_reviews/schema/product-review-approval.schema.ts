import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const productReviewApprovalSchema = vine.object({
    status: vine.string().minLength(3).maxLength(255).in(['approved', 'rejected']),
})

export type ProductReviewApprovalDto = Infer<typeof productReviewApprovalSchema>

export const productReviewApprovalDtoValidator = vine.create(productReviewApprovalSchema)
