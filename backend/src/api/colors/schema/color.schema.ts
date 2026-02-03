import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const colorSchema = vine.object({
    name: vine.string().minLength(3).maxLength(255),
    code: vine.string().minLength(3).maxLength(255),
})

export type ColorDto = Infer<typeof colorSchema>

export const colorDtoValidator = vine.create(colorSchema)
