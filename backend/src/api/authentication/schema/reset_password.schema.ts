import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const resetPasswordSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(255),
    confirm_password: vine.string().minLength(8).maxLength(255).sameAs('password'),
})

export type ResetPasswordDto = Infer<typeof resetPasswordSchema>

export const resetPasswordDtoValidator = vine.create(resetPasswordSchema)
