import { useEffect } from 'react'
import { getProfileServerFunc } from '@/lib/server_functions/account.server_function'
import { useAuthStore } from '@/lib/stores/auth.store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setAuthUser)

  useEffect(() => {
    getProfileServerFunc().then((res) => {
      if (res) {
        setUser(res)
      }
    })
  }, [setUser])

  return <>{children}</>
}
