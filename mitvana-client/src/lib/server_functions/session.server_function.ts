import { useAppSession } from "@/hooks/useAppSession"
import { createServerFn } from "@tanstack/react-start"


export const getSessionData = createServerFn().handler(async () => {
    const session = await useAppSession()
    return session.data
})