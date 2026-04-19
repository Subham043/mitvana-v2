import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const productFilterSchema = vine.object({
    is_draft: vine.boolean().optional(),
    category_slug: vine.string().optional(),
    min_price: vine.number().optional(),
    max_price: vine.number().optional(),
    sort_by: vine.string().in(['price', 'title', 'createdAt']).optional(),
    sort_order: vine.string().in(['asc', 'desc']).optional(),
    ...paginationSchema.getProperties(),
})

export type ProductFilterDto = Infer<typeof productFilterSchema>

export const productFilterDtoValidator = vine.create(productFilterSchema)