import { getQueryClient } from "@/lib/get-query-client";
import HomePageSection from "./_components/HomePageSection";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { skinCareParams, hairCareParams } from "./_lib/search-params.option";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(PublishedProductsQueryOptions(skinCareParams));

  void queryClient.prefetchQuery(PublishedProductsQueryOptions(hairCareParams));

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePageSection />
      </HydrationBoundary>
    </div>
  );
}
