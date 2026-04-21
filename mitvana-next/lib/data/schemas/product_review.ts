import * as yup from "yup";

export const productReviewSchema = yup
    .object({
        title: yup
            .string()
            .typeError("Title must contain characters only")
            .min(3, "Title must be at least 3 characters long")
            .max(255, "Title must be at most 255 characters long")
            .required("Title is required"),
        rating: yup
            .number()
            .typeError("Rating must be a number")
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5")
            .required("Rating is required"),
        description: yup
            .string()
            .typeError("Description must contain characters only")
            .max(255, "Description must be at most 255 characters long")
            .optional(),
        captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
    })
    .required();

export type ProductReviewFormValuesType = yup.InferType<typeof productReviewSchema>;