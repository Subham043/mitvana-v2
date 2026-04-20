import { SearchParamType } from "@/lib/types";
import SearchListHydrationBoundary from "./_components/SearchListHydrationBoundary";
import { getQueryClient } from "@/lib/get-query-client";
import {
  PublishedProductsQueryFn,
  PublishedProductsQueryKey,
} from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<SearchParamType>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;

  if (params.search && params.search.length > 0) {
    void queryClient.prefetchQuery({
      queryKey: PublishedProductsQueryKey(params as unknown as URLSearchParams),
      queryFn: ({ signal }) =>
        PublishedProductsQueryFn({
          params: params as unknown as URLSearchParams,
          signal,
        }),
    });
  }

  return (
    <div>
      <div className="container mx-auto max-w-[90%] py-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchListHydrationBoundary params={params} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
