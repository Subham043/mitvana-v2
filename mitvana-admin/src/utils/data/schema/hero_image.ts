import * as yup from "yup";

export const heroImageSchema = yup
    .object({
        is_update: yup
            .boolean()
            .typeError("Is update must be a boolean")
            .optional(),
        content: yup
            .string()
            .typeError("Content must contain characters only")
            .required("Content is required"),
        image: yup
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
                otherwise: (schema) => schema.test("fileRequired", "Image is required", (value: any) => {
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
                    .required("Image is required"),
            }),
    })
    .required();

export type HeroImageFormValuesType = yup.InferType<typeof heroImageSchema>;