import * as yup from "yup";

export const applyCouponSchema = yup
    .object({
        coupon_code: yup
            .string()
            .typeError("Coupon code must contain characters only")
            .min(1, "Coupon code is too short")
            .max(255, "Coupon code is too long")
            .matches(/^[a-zA-Z0-9]+$/, "Coupon code must contain letters and numbers only")
            .required("Coupon code is required"),
    })
    .required();

export type ApplyCouponFormValuesType = yup.InferType<typeof applyCouponSchema>;

export const selectAddressSchema = yup
    .object({
        address_id: yup
            .string()
            .typeError("Address ID must contain characters only")
            .required("Address ID is required"),
    })
    .required();

export type SelectAddressFormValuesType = yup.InferType<typeof selectAddressSchema>;