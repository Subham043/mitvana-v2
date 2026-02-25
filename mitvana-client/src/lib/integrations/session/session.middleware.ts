import { createMiddleware } from '@tanstack/react-start'
import { getSessionContext } from './session-provider'


export const sessionMiddleware = createMiddleware({ type: 'function' }).server(
    async ({ next }) => {
        return next({
            context: await getSessionContext(),
        })
    },
)