import * as yup from "yup";

export const offerSchema = yup
    .object({
        title: yup
            .string()
            .typeError("Title must contain characters only")
            .required("Title is required"),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .optional(),
        discount_percentage: yup
            .number()
            .typeError("Discount percentage must contain numbers only")
            .min(0, "Discount percentage must be at least 0")
            .max(100, "Discount percentage must be at most 100")
            .required("Discount percentage is required"),
        min_cart_value: yup
            .number()
            .typeError("Min cart value must contain numbers only")
            .min(0, "Min cart value must be at least 0")
            .optional(),
        max_discount: yup
            .number()
            .typeError("Max discount must contain numbers only")
            .min(0, "Max discount must be at least 0")
            .optional(),
        products: yup
            .array()
            .of(
                yup.object({
                    value: yup.string().optional(),
                    label: yup.string().optional(),
                })
            )
            .optional(),
    })
    .required();

export type OfferFormValuesType = yup.InferType<typeof offerSchema>;