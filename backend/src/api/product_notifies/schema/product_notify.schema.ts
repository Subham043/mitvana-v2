import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const productNotifySchema = vine.object({
    email: vine.string().minLength(3).maxLength(255),
    product_id: vine.string().minLength(3).maxLength(255),
})

export type ProductNotifyDto = Infer<typeof productNotifySchema>

export const productNotifyDtoValidator = vine.create(productNotifySchema)
