import { SearchParamType } from "@/lib/types";
import SearchListHydrationBoundary from "./_components/SearchListHydrationBoundary";
import { getQueryClient } from "@/lib/get-query-client";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSession } from "@/lib/get-session";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<SearchParamType>;
}) {
  const session = await getSession();

  const queryClient = getQueryClient();
  const params = await searchParams;

  if (params.search && params.search.length > 0) {
    void queryClient.prefetchQuery(
      PublishedProductsQueryOptions(
        params as unknown as URLSearchParams,
        session ? session.access_token : undefined,
      ),
    );
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
