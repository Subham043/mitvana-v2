import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const toggleUserBlockSchema = vine.object({
    is_blocked: vine.boolean(),
})

export type ToggleUserBlockDto = Infer<typeof toggleUserBlockSchema>

export const toggleUserBlockDtoValidator = vine.create(toggleUserBlockSchema)
