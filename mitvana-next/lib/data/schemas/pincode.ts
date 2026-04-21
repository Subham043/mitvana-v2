import * as yup from "yup";

export const pincodeSchema = yup
    .object({
        pincode: yup
            .number()
            .typeError("Pincode must be a number")
            .min(100000, "Pincode must be at least 100000")
            .max(999999, "Pincode must be at most 999999")
            .required("Pincode is required"),
    })
    .required();

export type PincodeFormValuesType = yup.InferType<typeof pincodeSchema>;