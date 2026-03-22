import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const categoryFilterSchema = vine.object({
    is_visible_in_navigation: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type CategoryFilterDto = Infer<typeof categoryFilterSchema>

export const categoryFilterDtoValidator = vine.create(categoryFilterSchema)