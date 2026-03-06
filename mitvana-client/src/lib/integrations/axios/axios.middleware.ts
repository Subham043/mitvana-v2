import { createMiddleware } from '@tanstack/react-start'
import { getAxiosContext } from './axios-provider'
import { sessionMiddleware } from '../session/session.middleware'
import { getRequest } from '@tanstack/react-start/server'

// axios.middleware.ts
export const axiosMiddleware = createMiddleware({ type: 'function' })
    .middleware([sessionMiddleware])
    .server(
        async ({ next, context }) => {
            const axiosContext = await getAxiosContext(context.session, getRequest())
            return next({
                context: {
                    ...context,
                    ...axiosContext,
                },
            })
        },
    )