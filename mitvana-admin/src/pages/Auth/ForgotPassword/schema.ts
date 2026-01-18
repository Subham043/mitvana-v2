import * as yup from "yup";

export const forgotPasswordSchema = yup
 .object({
  email: yup
   .string()
   .typeError("Email must contain characters only")
   .email("Please enter a valid email")
   .required("Email is required"),
  captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
 })
 .required();

export type ForgotPasswordFormValuesType = yup.InferType<typeof forgotPasswordSchema>;