import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const updateUserSchema = vine.object({
    email: vine.string().email().maxLength(255),
    name: vine.string().maxLength(255),
    phone: vine.string().minLength(10).maxLength(10).regex(/^[0-9]+$/),
    password: vine.string().minLength(8).maxLength(255).optional(),
    confirm_password: vine.string().minLength(8).maxLength(255).sameAs('password').optional().requiredIfExists('password'),
    is_blocked: vine.boolean().optional(),
})

export type UpdateUserDto = Infer<typeof updateUserSchema>

export const updateUserDtoValidator = vine.create(updateUserSchema)
