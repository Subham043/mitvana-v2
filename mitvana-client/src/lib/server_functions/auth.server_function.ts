import { createServerFn } from '@tanstack/react-start'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/lib/schemas/auth.schema'
import { api_routes } from '@/lib/constants/api_routes'
import type { AuthType, ApiResponse, TokenType } from '../type'
import { setResponseHeader } from '@tanstack/react-start/server'
import { withAxiosHandler } from '../integrations/axios/with-axios-handler'


export const loginServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(LoginSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.post<{ data: AuthType & TokenType }>(
            api_routes.auth.login,
            data
        )
        const cookies = res.headers['set-cookie']
        if (cookies) {
            cookies.forEach((cookie) => {
                setResponseHeader("set-cookie", cookie)
            })
        }
        await context.session.update(res.data.data)
        return res.data
    }))

export const registerServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(RegisterSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        // data is fully typed and validated
        const res = await context.axios.post<{ data: AuthType & TokenType }>(
            api_routes.auth.register, data
        )
        const cookies = res.headers['set-cookie']
        if (cookies) {
            cookies.forEach((cookie) => {
                setResponseHeader("set-cookie", cookie)
            })
        }
        await context.session.update(res.data.data)
        return res.data;
    }))

export const forgotPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ForgotPasswordSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.post<ApiResponse<{ message: string }>>(
            api_routes.auth.forgot_password, data
        );

        return res.data;
    }));

export const resetPasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ResetPasswordSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const { token, ...rest } = data;
        const res = await context.axios.post<{ message: string }>(
            `${api_routes.auth.reset_password}/${token}`, rest
        )
        return res.data
    }))
