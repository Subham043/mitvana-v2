import { z } from 'zod';

export const VerifyAccountSchema = z
    .object({
        verification_code: z
            .string()
            .min(4, "Verification code must be 4 digits long")
            .max(4, "Verification code must be 4 digits long"),
        captcha: z.string(),
    })
    .required();

export type VerifyAccountFormValuesType = z.infer<typeof VerifyAccountSchema>;

export const ProfileUpdateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
})

export type ProfileUpdateFormValuesType = z.infer<typeof ProfileUpdateSchema>;

export const PasswordUpdateSchema = z.object({
    current_password: z.string().min(1, 'Current Password is required'),
    new_password: z.string().min(8, 'New Password must be at least 8 characters long'),
    confirm_new_password: z
        .string()
        .min(8, 'Confirm New Password must be at least 8 characters long'),
}).refine((data) => data.new_password === data.confirm_new_password, {
    message: 'New Password & Confirm New Password do not match',
    path: ['confirm_new_password'],
})

export type PasswordUpdateFormValuesType = z.infer<typeof PasswordUpdateSchema>;