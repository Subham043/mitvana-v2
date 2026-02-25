import { createMiddleware } from '@tanstack/react-start'
import { getAxiosContext } from './axios-provider'
import { sessionMiddleware } from '../session/session.middleware'

// axios.middleware.ts
export const axiosMiddleware = createMiddleware({ type: 'function' })
    .middleware([sessionMiddleware])
    .server(
        async ({ next, context }) => {
            return next({
                context: await getAxiosContext(context.session),
            })
        },
    )