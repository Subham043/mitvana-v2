import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const tagSchema = vine.object({
    name: vine.string().minLength(3).maxLength(255),
})

export type TagDto = Infer<typeof tagSchema>

export const tagDtoValidator = vine.create(tagSchema)
