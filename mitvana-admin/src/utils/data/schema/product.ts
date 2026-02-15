import * as yup from "yup";

export const productSchema = yup
    .object({
        is_update: yup
            .boolean()
            .typeError("Is update must be a boolean")
            .optional(),
        title: yup
            .string()
            .typeError("Title must contain characters only")
            .required("Title is required"),
        sub_title: yup
            .string()
            .typeError("Sub title must contain characters only")
            .optional(),
        name: yup
            .string()
            .typeError("Name must contain characters only")
            .optional(),
        sku: yup
            .string()
            .typeError("SKU must contain characters only")
            .optional(),
        hsn: yup
            .string()
            .typeError("HSN must contain characters only")
            .optional(),
        price: yup
            .number()
            .typeError("Price must be a number")
            .required("Price is required"),
        discounted_price: yup
            .number()
            .typeError("Discounted price must be a number")
            .required("Discounted price is required"),
        tax: yup
            .number()
            .typeError("Tax must be a number")
            .required("Tax is required"),
        stock: yup
            .number()
            .typeError("Stock must be a number")
            .required("Stock is required"),
        slug: yup
            .string()
            .typeError("Slug must contain characters only")
            .when("is_update", {
                is: true,
                then: (schema) => schema.required("Slug is required"),
                otherwise: (schema) => schema.optional(),
            }),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .required("Description is required"),
        variant: yup
            .string()
            .typeError("Variant must contain characters only")
            .oneOf(["size", "color"])
            .required("Variant is required"),
        size_or_color: yup
            .string()
            .typeError("Size must contain characters only")
            .when("variant", {
                is: "size",
                then: (schema) => schema.required("Size is required"),
                otherwise: (schema) => schema.optional(),
            }),
        bought_text: yup
            .string()
            .typeError("Bought text must contain characters only")
            .oneOf(["notDisplay", "automatic", "manual"])
            .required("Bought text is required"),
        product_bought: yup
            .number()
            .typeError("Manual text must be a number")
            .when("bought_text", {
                is: "manual",
                then: (schema) => schema.required("Manual text is required"),
                otherwise: (schema) => schema.optional(),
            }),
        og_site_name: yup
            .string()
            .typeError("OG site name must contain characters only")
            .optional(),
        how_to_use: yup
            .string()
            .typeError("How to use must contain characters only")
            .optional(),
        meta_description: yup
            .string()
            .typeError("Meta description must contain characters only")
            .optional(),
        facebook_description: yup
            .string()
            .typeError("Facebook description must contain characters only")
            .optional(),
        twitter_description: yup
            .string()
            .typeError("Twitter description must contain characters only")
            .optional(),
        custom_script: yup
            .string()
            .typeError("Custom script must contain characters only")
            .optional(),
        product_selected: yup
            .object()
            .shape({
                value: yup.string().typeError("Product selected must contain characters only").optional(),
                label: yup.string().typeError("Product selected must contain characters only").optional(),
            })
            .optional(),
        related_products: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().typeError("Related product must contain characters only").optional(),
                    label: yup.string().typeError("Related product must contain characters only").optional(),
                })
            )
            .optional(),
        ingredients: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().typeError("Ingredient must contain characters only").optional(),
                    label: yup.string().typeError("Ingredient must contain characters only").optional(),
                })
            )
            .optional(),
        tags: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().typeError("Tag must contain characters only").optional(),
                    label: yup.string().typeError("Tag must contain characters only").optional(),
                })
            )
            .optional(),
        colors: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().typeError("Color must contain characters only").optional(),
                    label: yup.string().typeError("Color must contain characters only").optional(),
                })
            )
            .optional(),
        categories: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().typeError("Category must contain characters only").optional(),
                    label: yup.string().typeError("Category must contain characters only").optional(),
                })
            )
            .optional(),
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
        is_draft: yup
            .boolean()
            .typeError("Is draft must be a boolean")
            .optional(),
    })
    .required();

export type ProductFormValuesType = yup.InferType<typeof productSchema>;