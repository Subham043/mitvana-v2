import * as yup from "yup";

export const pincodeSchema = yup
    .object({
        pincode: yup
            .number()
            .typeError("Pincode must contain numbers only")
            .min(100000, "Pincode must be at least 6 digits")
            .max(999999, "Pincode must be at most 6 digits")
            .required("Pincode is required"),
        tat: yup
            .number()
            .typeError("TAT must contain numbers only")
            .optional(),   // ✅ FIX
        service: yup
            .string()
            .typeError("Service must contain characters only")
            .optional(),   // ✅ FIX
    })
    .required();

export type PincodeFormValuesType = yup.InferType<typeof pincodeSchema>;