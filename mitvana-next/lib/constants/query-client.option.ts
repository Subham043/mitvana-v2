import { defaultShouldDehydrateQuery, type QueryClientConfig } from "@tanstack/react-query";

export const QueryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      // see https://tanstack.com/query/v4/docs/guides/ssr#react
      staleTime: undefined,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      retry: 2,
      retryDelay: 3000,
      throwOnError: true,
    },
    dehydrate: {
      // include pending queries in dehydration
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) ||
        query.state.status === 'pending',
    },
  },
};