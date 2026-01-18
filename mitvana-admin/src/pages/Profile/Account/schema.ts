import * as yup from "yup";

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