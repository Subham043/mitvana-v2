import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const pincodeSchema = vine.object({
    pincode: vine.number().min(100000).max(999999),
    tat: vine.number().optional(),
    service: vine.string().optional(),
})

export type PincodeDto = Infer<typeof pincodeSchema>

export const pincodeDtoValidator = vine.create(pincodeSchema)
