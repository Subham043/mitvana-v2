import { getQueryClient } from "@/lib/get-query-client";
import ProductInfoHydrationBoundary from "./_components/ProductInfoHydrationBoundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  ProductSlugQueryFn,
  ProductSlugQueryKey,
} from "@/lib/data/queries/product";

async function ProductInfoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ProductSlugQueryKey(slug),
    queryFn: ({ signal }) =>
      ProductSlugQueryFn({
        slug,
        signal,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductInfoHydrationBoundary slug={slug} />
    </HydrationBoundary>
  );
}

export default ProductInfoPage;
