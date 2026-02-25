import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { AuthType } from '../type'
import { PasswordUpdateSchema, ProfileUpdateSchema } from '../schemas/account.schema'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(async ({ context }) => {
        const res = await context.axios.get<AuthType>(api_routes.account.get)
        if (context.session && context.session.data.token) {
            return { ...res.data, token: context.session.data.token }
        }
        return null
    })

export const updateProfileServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(ProfileUpdateSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.put<{ user: AuthType }>(
            api_routes.account.update,
            data
        )
        await context.session.update({
            ...context.session.data,
            name: res.data.user.name,
            email: res.data.user.email,
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
    if (context.session.data && context.session.data._id) {
        context.session.clear()
        return true
    }
    return false
})