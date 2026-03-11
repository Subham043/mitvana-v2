import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const offerUpdateStatusSchema = vine.object({
    is_draft: vine.boolean().optional(),
})

export type OfferUpdateStatusDto = Infer<typeof offerUpdateStatusSchema>

export const offerUpdateStatusDtoValidator = vine.create(offerUpdateStatusSchema)
