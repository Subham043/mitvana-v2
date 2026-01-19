import * as yup from "yup";

export const tagSchema = yup
    .object({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
    })
    .required();

export type TagFormValuesType = yup.InferType<typeof tagSchema>;