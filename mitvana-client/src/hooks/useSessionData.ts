import { Route } from '@/routes/__root'

export function useSessionData() {
    const { sessionData } = Route.useRouteContext()
    return sessionData
}