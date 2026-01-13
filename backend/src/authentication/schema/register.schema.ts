import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const registerSchema = vine.object({
    email: vine.string().email().maxLength(255),
    name: vine.string().maxLength(255),
    phone: vine.string().minLength(10).maxLength(10).regex(/^[0-9]+$/),
    password: vine.string().minLength(8).maxLength(255),
    confirm_password: vine.string().minLength(8).maxLength(255).sameAs('password'),
})

export type RegisterDto = Infer<typeof registerSchema>

export const registerDtoValidator = vine.create(registerSchema)
