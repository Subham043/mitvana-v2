import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const pincodeSchema = vine.object({
    pincode: vine.number().min(100000).max(999999),
    shipping_charges: vine.number().min(0),
    cgst: vine.number().min(0),
    sgst: vine.number().min(0),
    is_delivery_available: vine.boolean().optional(),
})

export type PincodeDto = Infer<typeof pincodeSchema>

export const pincodeDtoValidator = vine.create(pincodeSchema)
