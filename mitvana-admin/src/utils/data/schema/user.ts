import * as yup from "yup";

export const userSchema = yup
    .object({
        is_update: yup
            .boolean()
            .typeError("Is update must be a boolean")
            .optional(),
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
        password: yup
            .string()
            .typeError("Password must contain characters only")
            .min(7, "Password is too Short!")
            .max(50, "Password is too Long!")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(
                /[$&+,:;=?@#|'<>.^*()%!-]/,
                "Password must contain at least one special character"
            )
            .when("is_update", {
                is: true,
                then: (schema) => schema.optional(),
                otherwise: (schema) => schema.required("Password is required")
            }),
        confirm_password: yup
            .string()
            .typeError("Confirm Password must contain characters only")
            .when("is_update", {
                is: true,
                then: (schema) => schema.when("password", {
                    is: (val: string | undefined) => !!val,
                    then: (schema) => schema.oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
                    otherwise: (schema) => schema.optional(),
                }),
                otherwise: (schema) => schema.oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required")
            }),
        is_blocked: yup
            .boolean()
            .typeError("Is Blocked must be a boolean")
            .optional(),
    })
    .required();

export type UserFormValuesType = yup.InferType<typeof userSchema>;

export const userStatusSchema = yup
    .object({
        is_blocked: yup
            .boolean()
            .typeError("Is Blocked must be a boolean")
            .required("Is Blocked is required"),
    })
    .required();

export type UserStatusFormValuesType = yup.InferType<typeof userStatusSchema>;