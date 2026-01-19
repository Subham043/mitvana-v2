import * as yup from "yup";

export const colorSchema = yup
    .object({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
        code: yup
            .string()
            .typeError("Code must contain characters only")
            .required("Code is required"),
    })
    .required();

export type ColorFormValuesType = yup.InferType<typeof colorSchema>;