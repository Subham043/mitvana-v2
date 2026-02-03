import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const pincodeParamSchema = vine.number().min(100000).max(999999)

export type PincodeParamDto = Infer<typeof pincodeParamSchema>

export const pincodeParamDtoValidator = vine.create(pincodeParamSchema)
