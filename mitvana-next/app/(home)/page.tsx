import { getQueryClient } from "@/lib/get-query-client";
import HomePageSection from "./_components/HomePageSection";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { skinCareParams, hairCareParams } from "./_lib/search-params.option";
import { getSession } from "@/lib/get-session";
import { HeroImagesQueryOptions } from "@/lib/data/queries/hero_image";

export default async function Home() {
  const session = await getSession();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(HeroImagesQueryOptions()),

    queryClient.prefetchQuery(
      PublishedProductsQueryOptions(skinCareParams, session?.access_token),
    ),

    queryClient.prefetchQuery(
      PublishedProductsQueryOptions(hairCareParams, session?.access_token),
    ),
  ]);

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePageSection />
      </HydrationBoundary>
    </div>
  );
}
