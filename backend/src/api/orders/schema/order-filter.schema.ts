import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { paginationSchema } from 'src/utils/pagination/schema/pagination.schema'

const orderFilterSchema = vine.object({
    status: vine.string().in(['Order Placed', 'Order Created', 'Payment Failed', 'On Hold', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled by Admin', 'Cancelled By user', 'Refunded', 'Failed']).optional(),
    payment_status: vine.string().in(['Pending Payment', 'Success', 'Failed', 'Cancelled']).optional(),
    ...paginationSchema.getProperties(),
})

export type OrderFilterDto = Infer<typeof orderFilterSchema>

export const orderFilterDtoValidator = vine.create(orderFilterSchema)