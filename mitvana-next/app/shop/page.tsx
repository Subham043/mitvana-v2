import ImageHeroSection from "@/components/ImageHeroSection";
import ProductFilters from "./_components/ProductFilters";
import ProductPageHeader from "./_components/ProductPageHeader";
import { getQueryClient } from "@/lib/get-query-client";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductListHydrationBoundary from "./_components/ProductListHydrationBoundary";
import { SearchParamType } from "@/lib/types";
import { getSession } from "@/lib/get-session";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<SearchParamType>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;

  const session = await getSession();

  void queryClient.prefetchQuery(
    PublishedProductsQueryOptions(
      params as unknown as URLSearchParams,
      session ? session.access_token : undefined,
    ),
  );

  return (
    <div>
      <ImageHeroSection title="Shop" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto max-w-[90%]">
        <ProductPageHeader />
        <div className="flex lg:gap-x-10 pb-6 pt-2">
          <div className="lg:flex flex-col items-start w-1/5 border-r-2 pr-3 hidden sticky top-14 h-fit">
            <ProductFilters />
          </div>
          <div className="mt-3 w-full lg:w-4/5">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProductListHydrationBoundary params={params} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
