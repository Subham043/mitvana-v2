import { createServerFn } from '@tanstack/react-start'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/lib/schemas/auth.schema'
import { api_routes } from '@/lib/constants/api_routes'


export const loginServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(LoginSchema)
    .handler(async ({ data, context }) => {
        // data is fully typed and validated
        const res = await context.axios.post(
            api_routes.auth.login,
            { ...data, emailOrPhone: data.email, cartItem: null, totalCartPrice: null }
        )

        return res.data
    })

export const registerServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(RegisterSchema)
    .handler(async ({ data }) => {
        // data is fully typed and validated
        return `Created user: ${data.email}, password ${data.password}`
    })

export const forgotPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ForgotPasswordSchema)
    .handler(async ({ data }) => {
        // data is fully typed and validated
        return `Created user: ${data.email}`
    })

export const resetPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ResetPasswordSchema)
    .handler(async ({ data }) => {
        // data is fully typed and validated
        return `Created user: ${data.email}, password ${data.password}`
    })
