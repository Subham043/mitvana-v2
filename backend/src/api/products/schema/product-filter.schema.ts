import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const productFilterSchema = vine.object({
    is_draft: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type ProductFilterDto = Infer<typeof productFilterSchema>

export const productFilterDtoValidator = vine.create(productFilterSchema)