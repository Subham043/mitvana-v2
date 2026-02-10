import * as yup from "yup";

export const couponCodeSchema = yup
    .object({
        code: yup
            .string()
            .typeError("Code must contain characters only")
            .required("Code is required")
            .matches(/^[a-zA-Z0-9]+$/, "Code must contain characters only"),
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
            .required("Min cart value is required"),
        maximum_redemptions: yup
            .number()
            .typeError("Maximum redemptions must contain numbers only")
            .min(1, "Maximum redemptions must be at least 1")
            .required("Maximum redemptions is required"),
        expiration_date: yup
            .date()
            .typeError("Expiration date must be a valid date")
            .required("Expiration date is required")
            .min(new Date(), "Expiration date must be in the future"),
    })
    .required();

export type CouponCodeFormValuesType = yup.InferType<typeof couponCodeSchema>;