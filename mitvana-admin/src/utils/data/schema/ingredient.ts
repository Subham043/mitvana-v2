import * as yup from "yup";

export const ingredientSchema = yup
    .object({
        is_update: yup
            .boolean()
            .typeError("Is update must be a boolean")
            .optional(),
        title: yup
            .string()
            .typeError("Title must contain characters only")
            .required("Title is required"),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .required("Description is required"),
        thumbnail: yup
            .mixed()
            .when("is_update", {
                is: true,
                then: (schema) => schema.test("fileSize", "File size should be less than 5MB", (value: any) => {
                    if (value !== undefined) {
                        return value.size <= 5000000;
                    }
                    return true;
                })
                    .test("fileFormat", "Please select a valid image", (value: any) => {
                        if (value !== undefined) {
                            return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(value.type);
                        }
                        return true;
                    })
                    .transform((value) => {
                        if (value !== undefined) {
                            return value as Blob;
                        }
                        return undefined;
                    })
                    .optional(),
                otherwise: (schema) => schema.test("fileRequired", "Thumbnail is required", (value: any) => {
                    return value !== undefined;
                })
                    .test("fileSize", "File size should be less than 5MB", (value: any) => {
                        return value.size <= 5000000;
                    })
                    .test("fileFormat", "Please select a valid image", (value: any) => {
                        return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(value.type);
                    })
                    .transform((value) => {
                        return value as Blob;
                    })
                    .required("Thumbnail is required"),
            }),
    })
    .required();

export type IngredientFormValuesType = yup.InferType<typeof ingredientSchema>;