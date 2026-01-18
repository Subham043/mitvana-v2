import * as yup from "yup";

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