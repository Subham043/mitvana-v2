import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { ProfileType } from '../type'
import { PasswordUpdateSchema, ProfileUpdateSchema } from '../schemas/account.schema'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(async ({ context }) => {
        const res = await context.axios.get<{ data: ProfileType }>(api_routes.account.get)
        if (context.session && context.session.data.access_token && context.session.data.refresh_token) {
            return { ...res.data, access_token: context.session.data.access_token, refresh_token: context.session.data.refresh_token }
        }
        return null
    })

export const updateProfileServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ProfileUpdateSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.put<{ data: ProfileType }>(
            api_routes.account.update,
            data
        )
        await context.session.update({
            ...context.session.data,
            ...res.data.data
        })
        return res.data
    })

export const updatePasswordServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(PasswordUpdateSchema)
    .handler(async ({ data, context }) => {
        await context.axios.put(
            api_routes.account.update_password,
            data
        )
    })

export const logoutServerFunc = createServerFn().handler(async ({ context }) => {
    if (context.session.data && context.session.data.id) {
        await context.axios.get(api_routes.account.logout)
        context.session.clear()
        return true
    }
    return false
})