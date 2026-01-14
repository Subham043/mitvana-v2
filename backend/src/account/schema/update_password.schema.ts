import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const updatePasswordSchema = vine.object({
    current_password: vine.string().minLength(8).maxLength(255),
    new_password: vine.string().minLength(8).maxLength(255),
    confirm_new_password: vine.string().minLength(8).maxLength(255).sameAs('new_password'),
})

export type UpdatePasswordDto = Infer<typeof updatePasswordSchema>

export const updatePasswordDtoValidator = vine.create(updatePasswordSchema)
