import { getQueryClient } from "@/lib/get-query-client";
import HomePageSection from "./_components/HomePageSection";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { skinCareParams, hairCareParams } from "./_lib/search-params.option";
import { getSession } from "@/lib/get-session";

export default async function Home() {
  const session = await getSession();

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    PublishedProductsQueryOptions(
      skinCareParams,
      session ? session.access_token : undefined,
    ),
  );

  void queryClient.prefetchQuery(
    PublishedProductsQueryOptions(
      hairCareParams,
      session ? session.access_token : undefined,
    ),
  );

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePageSection />
      </HydrationBoundary>
    </div>
  );
}
