import { Suspense } from "react";
import ProductInfoPageSkeleton from "./ProductInfoPageSkeleton";
import ProductInfoSection from "./ProductInfoSection";

function ProductInfoHydrationBoundary({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<ProductInfoPageSkeleton />}>
      <ProductInfoSection slug={slug} />
    </Suspense>
  );
}

export default ProductInfoHydrationBoundary;
