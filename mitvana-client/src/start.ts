import { createStart } from '@tanstack/react-start'
import { axiosMiddleware } from './lib/integrations/axios/axios.middleware'


export const startInstance = createStart(() => {
    return {
        functionMiddleware: [axiosMiddleware],
    }
})