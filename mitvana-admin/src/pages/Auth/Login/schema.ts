import * as yup from "yup";

export const loginSchema = yup
 .object({
  email: yup
   .string()
   .typeError("Email must contain characters only")
   .email("Please enter a valid email")
   .required("Email is required"),
  password: yup
   .string()
   .typeError("Password must contain characters only")
   .required("Password is required"),
  captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
 })
 .required();

export type LoginFormValuesType = yup.InferType<typeof loginSchema>;