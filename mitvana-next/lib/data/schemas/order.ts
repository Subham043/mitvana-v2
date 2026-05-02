import * as yup from "yup";

export const reasonStatusSchema = yup
    .object({
        cancellation_reason: yup
            .string()
            .required("Cancellation reason is required"),
    })
    .required();

export type ReasonStatusFormValuesType = yup.InferType<typeof reasonStatusSchema>;

export const placeOrderSchema = yup
    .object({
        address_id: yup.string().required("Please select an address"),
        order_note: yup.string().optional(),
        isChecked: yup
            .boolean()
            .oneOf([true], "Please accept the terms and conditions to checkout")
            .required("Please accept the terms and conditions to checkout"),
    })
    .required();

export type PlaceOrderFormValuesType = yup.InferType<
    typeof placeOrderSchema
>;

export const verifyOrderSchema = yup
    .object({
        razorpay_order_id: yup.string().required("razorpay_order_id is required"),
        razorpay_payment_id: yup.string().required("razorpay_payment_id is required"),
        razorpay_signature: yup.string().required("razorpay_signature is required"),
        order_id: yup.string().required("order_id is required"),
    })
    .required();

export type VerifyOrderFormValuesType = yup.InferType<
    typeof verifyOrderSchema
>;

export const paymentFailedOrderSchema = yup
    .object({
        razorpay_order_id: yup.string().required("razorpay_order_id is required"),
        razorpay_payment_id: yup.string().required("razorpay_payment_id is required"),
        order_id: yup.string().required("order_id is required"),
    })
    .required();

export type PaymentFailedOrderFormValuesType = yup.InferType<
    typeof paymentFailedOrderSchema
>;

export const paymentCancelledOrderSchema = yup
    .object({
        razorpay_order_id: yup.string().required("razorpay_order_id is required"),
        order_id: yup.string().required("order_id is required"),
    })
    .required();

export type PaymentCancelledOrderFormValuesType = yup.InferType<
    typeof paymentCancelledOrderSchema
>;