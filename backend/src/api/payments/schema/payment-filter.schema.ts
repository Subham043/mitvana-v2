import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const paymentFilterSchema = vine.object({
    status: vine.string().in(['Pending Payment', 'Success', 'Failed', 'Cancelled']).optional(),
    ...paginationSchema.getProperties(),
})

export type PaymentFilterDto = Infer<typeof paymentFilterSchema>

export const paymentFilterDtoValidator = vine.create(paymentFilterSchema)