import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const productUpdateStatusSchema = vine.object({
    is_draft: vine.boolean().optional(),
})

export type ProductUpdateStatusDto = Infer<typeof productUpdateStatusSchema>

export const productUpdateStatusDtoValidator = vine.create(productUpdateStatusSchema)
