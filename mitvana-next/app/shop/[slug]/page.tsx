import { getQueryClient } from "@/lib/get-query-client";
import ProductInfoHydrationBoundary from "./_components/ProductInfoHydrationBoundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductSlugQueryOptions } from "@/lib/data/queries/product";
import { getSession } from "@/lib/get-session";

async function ProductInfoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const session = await getSession();

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    ProductSlugQueryOptions(slug, session ? session.access_token : undefined),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductInfoHydrationBoundary slug={slug} />
    </HydrationBoundary>
  );
}

export default ProductInfoPage;
