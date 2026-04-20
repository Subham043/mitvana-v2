import { getQueryClient } from "@/lib/get-query-client";
import HomePageSection from "./_components/HomePageSection";
import {
  PublishedProductsQueryFn,
  PublishedProductsQueryKey,
} from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  const skinCareParams = new URLSearchParams(
    "page=1&limit=8&category_slug=skin-care&sort_by=price&sort_order=asc",
  );
  const hairCareParams = new URLSearchParams(
    "page=1&limit=8&category_slug=hair-care&sort_by=price&sort_order=asc",
  );

  void queryClient.prefetchQuery({
    queryKey: PublishedProductsQueryKey(skinCareParams),
    queryFn: ({ signal }) =>
      PublishedProductsQueryFn({
        params: skinCareParams,
        signal,
      }),
  });

  void queryClient.prefetchQuery({
    queryKey: PublishedProductsQueryKey(hairCareParams),
    queryFn: ({ signal }) =>
      PublishedProductsQueryFn({
        params: hairCareParams,
        signal,
      }),
  });

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePageSection />
      </HydrationBoundary>
    </div>
  );
}
