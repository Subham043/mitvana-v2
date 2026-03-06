import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    captcha: z.string(),
})

export type ForgotPasswordFormValuesType = z.infer<typeof ForgotPasswordSchema>;

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    captcha: z.string(),
})

export type LoginFormValuesType = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    token: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z
        .string()
        .min(8, 'Confirm Password must be at least 8 characters long'),
    captcha: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
})

export type ResetPasswordFormValuesType = z.infer<typeof ResetPasswordSchema>;

export const RegisterSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z
        .string()
        .min(8, 'Confirm Password must be at least 8 characters long'),
    captcha: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
})

export type RegisterFormValuesType = z.infer<typeof RegisterSchema>;