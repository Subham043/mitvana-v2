import * as yup from "yup";

export const settingSchema = yup
    .object({
        min_cart_value_for_free_shipping: yup
            .number()
            .typeError("Min cart value for free shipping must contain numbers only")
            .min(0, "Min cart value for free shipping must be at least 0")
            .optional(),
        admin_email: yup
            .string()
            .typeError("Admin email must contain characters only")
            .email("Admin email must be a valid email")
            .optional(),
        top_banner_text: yup
            .string()
            .typeError("Top banner text must contain characters only")
            .optional(),
    })
    .required();

export type SettingFormValuesType = yup.InferType<typeof settingSchema>;