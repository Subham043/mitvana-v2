import * as yup from "yup";

export const userCreateSchema = yup
    .object({
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
        confirm_password: yup
            .string()
            .typeError("Confirm Password must contain characters only")
            .required("Confirm Password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
        is_blocked: yup
            .boolean()
            .typeError("Is Blocked must be a boolean")
            .optional(),
    })
    .required();

export type UserCreateFormValuesType = yup.InferType<typeof userCreateSchema>;

export const userUpdateSchema = yup
    .object({
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
            .optional(),
        confirm_password: yup.string().when("password", {
            is: (val: string | undefined) => !!val,
            then: (schema) => schema.required().oneOf([yup.ref("password")]),
            otherwise: (schema) => schema.optional(),
        }),
        is_blocked: yup
            .boolean()
            .typeError("Is Blocked must be a boolean")
            .optional(),
    })
    .required();

export type UserUpdateFormValuesType = yup.InferType<typeof userUpdateSchema>;

export const userStatusSchema = yup
    .object({
        is_blocked: yup
            .boolean()
            .typeError("Is Blocked must be a boolean")
            .required("Is Blocked is required"),
    })
    .required();

export type UserStatusFormValuesType = yup.InferType<typeof userStatusSchema>;