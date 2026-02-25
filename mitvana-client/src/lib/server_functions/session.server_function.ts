import { type SessionData } from "@/lib/integrations/session/useAppSession"
import { createServerFn } from "@tanstack/react-start"


export const getSessionData = createServerFn().handler(async ({ context }) => {
    if (context.session.data && context.session.data._id && context.session.data.token) {
        return context.session.data as SessionData
    }
    context.session.clear()
    return null
})