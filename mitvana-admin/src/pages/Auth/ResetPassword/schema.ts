import * as yup from "yup";

export const resetPasswordSchema = yup
  .object({
    email: yup
       .string()
       .typeError("Email must contain characters only")
       .email("Please enter a valid email")
       .required("Email is required"),
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
    password_confirmation: yup
      .string()
      .typeError("Confirm Password must contain characters only")
      .required("Confirm Password is required")
      .oneOf(
        [yup.ref("password")],
        "Confirm Passwords must match password entered above"
      ),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export type ResetPasswordFormValuesType = yup.InferType<typeof resetPasswordSchema>;