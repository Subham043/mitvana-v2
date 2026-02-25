import { useMemo } from 'react'
import { useAuthStore } from '@/lib/stores/auth.store'
import type { SessionData } from '@/lib/integrations/session/useAppSession'

export function AuthProvider({
  children,
  sessionData,
}: {
  children: React.ReactNode
  sessionData: SessionData | null
}) {
  useMemo(() => {
    useAuthStore.getState().hydrateFromSession(sessionData)
  }, [sessionData])

  return <>{children}</>
}
