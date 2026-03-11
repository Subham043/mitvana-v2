import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const categoryUpdateStatusSchema = vine.object({
    is_visible_in_navigation: vine.boolean().optional(),
})

export type CategoryUpdateStatusDto = Infer<typeof categoryUpdateStatusSchema>

export const categoryUpdateStatusDtoValidator = vine.create(categoryUpdateStatusSchema)
