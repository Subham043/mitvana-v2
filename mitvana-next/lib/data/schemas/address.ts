import * as yup from "yup";

export const addressSchema = yup
    .object({
        first_name: yup
            .string()
            .typeError("First name must contain characters only")
            .min(3, "First name must be at least 3 characters long")
            .max(255, "First name must be at most 255 characters long")
            .required("First name is required"),
        last_name: yup
            .string()
            .typeError("Last name must contain characters only")
            .min(3, "Last name must be at least 3 characters long")
            .max(255, "Last name must be at most 255 characters long")
            .required("Last name is required"),
        phone_number: yup
            .string()
            .typeError("Phone number must contain numbers only")
            .min(10, "Phone number must be at least 10 digits long")
            .max(10, "Phone number must be at most 10 digits long")
            .matches(/^[0-9]+$/, "Phone number must contain numbers only")
            .required("Phone number is required"),
        country: yup
            .string()
            .typeError("Country must contain characters only")
            .min(3, "Country must be at least 3 characters long")
            .max(255, "Country must be at most 255 characters long")
            .required("Country is required"),
        city: yup
            .string()
            .typeError("City must contain characters only")
            .min(3, "City must be at least 3 characters long")
            .max(255, "City must be at most 255 characters long")
            .required("City is required"),
        state: yup
            .string()
            .typeError("State must contain characters only")
            .min(3, "State must be at least 3 characters long")
            .max(255, "State must be at most 255 characters long")
            .required("State is required"),
        postal_code: yup
            .number()
            .typeError("Postal code must be a number")
            .min(100000, "Postal code must be at least 100000")
            .max(999999, "Postal code must be at most 999999")
            .required("Postal code is required"),
        address: yup
            .string()
            .typeError("Address must contain characters only")
            .min(3, "Address must be at least 3 characters long")
            .max(255, "Address must be at most 255 characters long")
            .required("Address is required"),
        address_2: yup
            .string()
            .typeError("Address 2 must contain characters only")
            .max(255, "Address 2 must be at most 255 characters long")
            .optional(),
        company_name: yup
            .string()
            .typeError("Company name must contain characters only")
            .max(255, "Company name must be at most 255 characters long")
            .optional(),
        address_type: yup
            .string()
            .typeError("Address type must contain characters only")
            .min(3, "Address type must be at least 3 characters long")
            .max(255, "Address type must be at most 255 characters long")
            .oneOf(['Home', 'Work'], "Address type must be either Home or Work")
            .required("Address type is required"),
    })
    .required();

export type AddressFormValuesType = yup.InferType<typeof addressSchema>;