import * as yup from "yup";

export const pincodeSchema = yup
    .object({
        pincode: yup
            .number()
            .typeError("Pincode must contain numbers only")
            .min(100000, "Pincode must be at least 6 digits")
            .max(999999, "Pincode must be at most 6 digits")
            .required("Pincode is required"),
        shipping_charges: yup
            .number()
            .typeError("Shipping charges must be a number")
            .required("Shipping charges is required"),
        is_igst_applicable: yup
            .boolean()
            .typeError("Is IGST applicable must be a boolean")
            .optional(),
        is_delivery_available: yup
            .boolean()
            .typeError("Is delivery available must be a boolean")
            .optional(),
    })
    .required();

export type PincodeFormValuesType = yup.InferType<typeof pincodeSchema>;

export const pincodeStatusSchema = yup
    .object({
        is_delivery_available: yup
            .boolean()
            .typeError("Is delivery available must be a boolean")
            .optional(),
    })
    .required();

export type PincodeStatusFormValuesType = yup.InferType<typeof pincodeStatusSchema>;