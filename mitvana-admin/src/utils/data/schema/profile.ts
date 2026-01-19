import * as yup from "yup";

export const verifyAccountSchema = yup
    .object({
        verification_code: yup
            .string()
            .typeError("Verification code must contain numbers only")
            .required("Verification code is required")
            .min(4, "Verification code must be 4 digits long")
            .max(4, "Verification code must be 4 digits long")
            .matches(/^[0-9]+$/, "Verification code must contain numbers only"),
        captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
    })
    .required();

export type VerifyAccountFormValuesType = yup.InferType<typeof verifyAccountSchema>;

export const profileUpdateFormSchema = yup
    .object()
    .shape({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
        email: yup
            .string()
            .typeError("Email must contain characters only")
            .email("Please enter a valid email")
            .required("Email is required"),
        phone: yup
            .string()
            .matches(/^[0-9]+$/, "Phone must contain numbers only")
            .length(10, "Phone must contain exactly 10 digits")
            .defined(),
    })
    .required();


export type ProfileUpdateFormValuesType = yup.InferType<
    typeof profileUpdateFormSchema
>;

export const passwordUpdateFormSchema = yup
    .object()
    .shape({
        current_password: yup
            .string()
            .typeError("Current Password must contain characters only")
            .required("Current Password is required"),
        new_password: yup
            .string()
            .typeError("Password must contain characters only")
            .required("Password is required")
            .min(7, "Password is too Short!")
            .max(50, "Password is too Long!")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(
                /[$&+,:;=?@#|'<>.^*()%!-]/,
                "Password must contain at least one special character"
            ),
        confirm_new_password: yup
            .string()
            .typeError("Confirm Password must contain characters only")
            .required("Confirm Password is required")
            .oneOf([yup.ref("new_password")], "Passwords must match"),
    })
    .required();


export type PasswordUpdateFormValuesType = yup.InferType<
    typeof passwordUpdateFormSchema
>;