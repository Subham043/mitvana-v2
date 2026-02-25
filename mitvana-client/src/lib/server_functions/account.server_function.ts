import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { AuthType } from '../type'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(async ({ context }) => {
        const res = await context.axios.get<AuthType>(api_routes.account.get)
        if (context.session && context.session.data._id && context.session.data.token) {
            context.session.update({
                ...context.session.data,
                ...res.data
            })
            return { ...res.data, token: context.session.data.token }
        }
        return null
    })


export const logoutServerFunc = createServerFn().handler(async ({ context }) => {
    if (context.session.data && context.session.data._id) {
        context.session.clear()
        return true
    }
    return false
})