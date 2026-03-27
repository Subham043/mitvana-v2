import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const orderUpdateStatusSchema = vine.object({
    status: vine.string().in(['Order Placed', 'Order Created', 'Payment Failed', 'On Hold', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled by Admin', 'Cancelled By user', 'Refunded', 'Failed']),
    cancellation_reason: vine.string().optional().requiredWhen('status', '=', 'Cancelled by Admin'),
})

export type OrderUpdateStatusDto = Infer<typeof orderUpdateStatusSchema>

export const orderUpdateStatusDtoValidator = vine.create(orderUpdateStatusSchema)
