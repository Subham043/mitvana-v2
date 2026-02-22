import { QueryClientOptions } from '@/lib/constants/query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function getTanStackContext() {
  const queryClient = new QueryClient(QueryClientOptions)
  return {
    queryClient,
  }
}

const TanStackQueryProvider = ({ children }: { children: ReactNode }) => {
  const { queryClient } = getTanStackContext()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default TanStackQueryProvider
