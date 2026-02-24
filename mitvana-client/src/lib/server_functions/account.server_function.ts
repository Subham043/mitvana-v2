import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { AuthType } from '../type'
import { useAppSession } from '@/hooks/useAppSession'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(async ({ context }) => {
        const session = await useAppSession()
        console.log("session: ", session.data)
        if (!session.data) {
            return null;
        }
        const res = await context.axios.get<AuthType>(api_routes.account.get)
        console.log("res: ", res.data)
        return res.data
    })