import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const forgotPasswordSchema = vine.object({
    email: vine.string().email(),
})

export type ForgotPasswordDto = Infer<typeof forgotPasswordSchema>

export const forgotPasswordDtoValidator = vine.create(forgotPasswordSchema)
