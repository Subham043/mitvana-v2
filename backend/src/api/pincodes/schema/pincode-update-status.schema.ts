import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const pincodeUpdateStatusSchema = vine.object({
    is_delivery_available: vine.boolean().optional(),
})

export type PincodeUpdateStatusDto = Infer<typeof pincodeUpdateStatusSchema>

export const pincodeUpdateStatusDtoValidator = vine.create(pincodeUpdateStatusSchema)
