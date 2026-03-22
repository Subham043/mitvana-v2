import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const userFilterSchema = vine.object({
    is_verified: vine.boolean().optional(),
    is_blocked: vine.boolean().optional(),
    ...paginationSchema.getProperties(),
})

export type UserFilterDto = Infer<typeof userFilterSchema>

export const userFilterDtoValidator = vine.create(userFilterSchema)