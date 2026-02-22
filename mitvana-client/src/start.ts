import { createStart } from '@tanstack/react-start'
// import axios from 'axios'
// import { axiosMiddleware } from './lib/integrations/axios/axios.middleware'

// function createAxiosFromRequest(request: Request) {
//   const cookie = request.headers.get('cookie')

//   return axios.create({
//     baseURL: process.env.API_URL,
//     headers: cookie ? { Cookie: cookie } : {},
//   })
// }
export const startInstance = createStart(() => {
    return {
        // functionMiddleware: [axiosMiddleware],
    }
})