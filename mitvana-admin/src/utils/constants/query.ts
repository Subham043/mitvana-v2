import type { QueryClientConfig } from "@tanstack/react-query";

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
    },
  },
};

export const QueryInitialPageParam = 1;

export const QueryTotalCount = 10;