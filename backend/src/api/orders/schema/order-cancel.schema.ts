import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const orderCancelSchema = vine.object({
    cancellation_reason: vine.string().minLength(2).maxLength(500),
})

export type OrderCancelDto = Infer<typeof orderCancelSchema>

export const orderCancelDtoValidator = vine.create(orderCancelSchema)
