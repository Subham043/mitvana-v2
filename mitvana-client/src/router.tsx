import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { getTanStackContext } from './lib/integrations/tanstack-query/tanstack-provider'
import type { AxiosInstance } from 'axios'

export async function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: {
      ...getTanStackContext(),
    },

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
    server: {
      requestContext: {
        axios: AxiosInstance
      }
    }
  }
}
