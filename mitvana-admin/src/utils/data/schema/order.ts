import * as yup from "yup";

export const orderStatusSchema = yup
    .object({
        status: yup
            .string()
            .oneOf(['Order Placed', 'Order Created', 'Payment Failed', 'On Hold', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled by Admin', 'Cancelled By user', 'Refunded', 'Failed'])
            .required("Status is required"),
        cancellation_reason: yup
            .string()
            .when('status', {
                is: (status: string) => status === 'Cancelled by Admin',
                then: (schema) => schema.required("Cancellation reason is required"),
                otherwise: (schema) => schema.optional(),
            }),
    })
    .required();

export type OrderStatusFormValuesType = yup.InferType<typeof orderStatusSchema>;