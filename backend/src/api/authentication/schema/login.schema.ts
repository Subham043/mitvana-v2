import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
})

export type LoginDto = Infer<typeof loginSchema>

export const loginDtoValidator = vine.create(loginSchema)
