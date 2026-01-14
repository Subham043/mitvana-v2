import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const profileSchema = vine.object({
    email: vine.string().email().maxLength(255),
    name: vine.string().maxLength(255),
    phone: vine.string().minLength(10).maxLength(10).regex(/^[0-9]+$/),
})

export type ProfileDto = Infer<typeof profileSchema>

export const profileDtoValidator = vine.create(profileSchema)
