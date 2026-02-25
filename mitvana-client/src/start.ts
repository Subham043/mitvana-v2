import { createStart } from '@tanstack/react-start'
import { axiosMiddleware } from './lib/integrations/axios/axios.middleware'
import { sessionMiddleware } from './lib/integrations/session/session.middleware'


export const startInstance = createStart(() => {
    return {
        functionMiddleware: [sessionMiddleware, axiosMiddleware],
    }
})