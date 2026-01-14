import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const subscriptionSchema = vine.object({
    email: vine.string().email(),
})

export type SubscriptionDto = Infer<typeof subscriptionSchema>

export const subscriptionDtoValidator = vine.create(subscriptionSchema)
