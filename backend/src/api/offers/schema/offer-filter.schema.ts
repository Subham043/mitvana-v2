import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const offerFilterSchema = vine.object({
    is_draft: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type OfferFilterDto = Infer<typeof offerFilterSchema>

export const offerFilterDtoValidator = vine.create(offerFilterSchema)