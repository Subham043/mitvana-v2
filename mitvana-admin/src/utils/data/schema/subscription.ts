import * as yup from "yup";

export const subscriptionSchema = yup
    .object({
        email: yup
            .string()
            .typeError("Email must contain characters only")
            .email("Please enter a valid email")
            .required("Email is required"),
    })
    .required();

export type SubscriptionFormValuesType = yup.InferType<typeof subscriptionSchema>;