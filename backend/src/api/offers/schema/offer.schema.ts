import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const offerSchema = vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(255).optional(),
    discount_percentage: vine.number().min(0).max(100),
    min_cart_value: vine.number().min(0).optional(),
    max_discount: vine.number().min(0).optional(),
    products: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
})

export type OfferDto = Infer<typeof offerSchema>

export const offerDtoValidator = vine.create(offerSchema)
