import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const paginationSchema = vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(50).optional(),
    search: vine.string().optional(),
})

export type PaginationDto = Infer<typeof paginationSchema>

export const paginationDtoValidator = vine.create(paginationSchema)
