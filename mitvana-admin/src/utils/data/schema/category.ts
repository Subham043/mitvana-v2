import * as yup from "yup";

export const categoryCreateSchema = yup
    .object({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
        slug: yup
            .string()
            .typeError("Slug must contain characters only")
            .required("Slug is required"),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .required("Description is required"),
        thumbnail: yup
            .mixed()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .test("fileRequired", "Thumbnail is required", (value: any) => {
                return value !== undefined;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .test("fileSize", "File size should be less than 5MB", (value: any) => {
                return value.size <= 5000000;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .test("fileFormat", "Please select a valid image", (value: any) => {
                return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(value.type);
            })
            .transform((value) => {
                return value as Blob;
            })
            .required("Thumbnail is required"),
        is_visible_in_navigation: yup
            .boolean()
            .typeError("Is visible in navigation must be a boolean")
            .required("Is visible in navigation is required"),
    })
    .required();

export type CategoryCreateFormValuesType = yup.InferType<typeof categoryCreateSchema>;

export const categoryUpdateSchema = yup
    .object({
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .required("Name is required"),
        slug: yup
            .string()
            .typeError("Slug must contain characters only")
            .required("Slug is required"),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .required("Description is required"),
        thumbnail: yup
            .mixed()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .test("fileSize", "File size should be less than 5MB", (value: any) => {
                if (value !== undefined) {
                    return value.size <= 5000000;
                }
                return true;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        is_visible_in_navigation: yup
            .boolean()
            .typeError("Is visible in navigation must be a boolean")
            .required("Is visible in navigation is required"),
    })
    .required();

export type CategoryUpdateFormValuesType = yup.InferType<typeof categoryUpdateSchema>;