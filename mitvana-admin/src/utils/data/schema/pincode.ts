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
        cgst: yup
            .number()
            .typeError("CGST must be a number")
            .required("CGST is required"),
        sgst: yup
            .number()
            .typeError("SGST must be a number")
            .required("SGST is required"),
        is_delivery_available: yup
            .boolean()
            .typeError("Is draft must be a boolean")
            .optional(),
    })
    .required();

export type PincodeFormValuesType = yup.InferType<typeof pincodeSchema>;