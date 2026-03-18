import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { ProfileType } from '../type'
import { PasswordUpdateSchema, ProfileUpdateSchema } from '../schemas/account.schema'
import { withAxiosHandler } from '../integrations/axios/with-axios-handler'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(withAxiosHandler(async ({ context }) => {
        const res = await context.axios.get<{ data: ProfileType }>(api_routes.account.get)
        return res.data;
    }))

export const updateProfileServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ProfileUpdateSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.put<{ data: ProfileType }>(
            api_routes.account.update,
            data
        )
        await context.session.update({
            ...context.session.data,
            ...res.data.data
        })
        return res.data
    }))

export const updatePasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(PasswordUpdateSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.put(
            api_routes.account.update_password,
            data
        )
        return res.data
    }))

export const logoutServerFunc = createServerFn().handler(withAxiosHandler(async ({ context }) => {
    if (context.session.data && context.session.data.id) {
        const res = await context.axios.get(api_routes.account.logout)
        context.session.clear()
        return res.data
    }
    return {
        error: true,
        message: "No session found",
        status: 401,
    }
}))