import { z } from 'zod';

export const ProfileUpdateSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
})

export type ProfileUpdateFormValuesType = z.infer<typeof ProfileUpdateSchema>;

export const PasswordUpdateSchema = z.object({
    current_password: z.string().min(8, 'Password must be at least 8 characters long'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z
        .string()
        .min(8, 'Confirm Password must be at least 8 characters long'),
}).refine((data) => data.newPassword === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
})

export type PasswordUpdateFormValuesType = z.infer<typeof PasswordUpdateSchema>;