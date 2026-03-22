import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const pincodeFilterSchema = vine.object({
    is_igst_applicable: vine.boolean().optional(),
    is_delivery_available: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type PincodeFilterDto = Infer<typeof pincodeFilterSchema>

export const pincodeFilterDtoValidator = vine.create(pincodeFilterSchema)