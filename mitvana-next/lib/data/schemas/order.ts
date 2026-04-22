import * as yup from "yup";

export const reasonStatusSchema = yup
    .object({
        cancellation_reason: yup
            .string()
            .required("Cancellation reason is required"),
    })
    .required();

export type ReasonStatusFormValuesType = yup.InferType<typeof reasonStatusSchema>;