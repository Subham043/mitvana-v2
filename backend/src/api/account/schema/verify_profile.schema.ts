import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const verifyProfileSchema = vine.object({
    verification_code: vine.string().minLength(4).maxLength(4).regex(/^[0-9]+$/),
})

export type VerifyProfileDto = Infer<typeof verifyProfileSchema>

export const verifyProfileDtoValidator = vine.create(verifyProfileSchema)
