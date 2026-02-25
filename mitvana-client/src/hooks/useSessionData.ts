import { Route } from '@/routes/__root'

export function useSessionData() {
    const { sessionData } = Route.useRouteContext() // reads from root route context
    return sessionData
}