import { createMiddleware } from '@tanstack/react-start'
import { getAxiosContext } from './axios-provider'


export const axiosMiddleware = createMiddleware({ type: 'function' }).server(
    async ({ next }) => {
        return next({
            context: await getAxiosContext(),
        })
    },
)