import { createServerFn } from '@tanstack/react-start'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/lib/schemas/auth.schema'
import { api_routes } from '@/lib/constants/api_routes'
import type { AuthType, TokenType } from '../type'
import { useAppSession } from '@/hooks/useAppSession'


export const loginServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(LoginSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.post<{ user: AuthType } & TokenType>(
            api_routes.auth.login,
            { ...data, emailOrPhone: data.email, cartItem: null, totalCartPrice: null }
        )
        const session = await useAppSession()
        await session.update({
            _id: res.data.user._id,
            email: res.data.user.email,
            name: res.data.user.name,
            token: res.data.token,
        })
        return res.data
    })

export const registerServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(RegisterSchema)
    .handler(async ({ data, context }) => {
        // data is fully typed and validated
        const res = await context.axios.post<{ user: AuthType } & TokenType>(
            api_routes.auth.register, data
        )
        const session = await useAppSession()
        await session.update({
            _id: res.data.user._id,
            email: res.data.user.email,
            name: res.data.user.name,
            token: res.data.token,
        })
        return res.data;
    })

export const forgotPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ForgotPasswordSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.post<{ message: string }>(
            api_routes.auth.forgot_password, data
        )
        return res.data
    })

export const resetPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ResetPasswordSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.post<{ message: string }>(
            api_routes.auth.reset_password, { ...data, newPassword: data.password }
        )
        return res.data
    })
