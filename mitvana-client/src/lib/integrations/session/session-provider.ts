import { useAppSession } from "@/lib/integrations/session/useAppSession";

async function getSession() {
    return await useAppSession()
}

export async function getSessionContext() {
    const session = await getSession()
    return {
        session,
    }
}