import { Suspense } from "react";
import ProductCarouselSection from "./ProductCarouselSection";
import ProductCarourselSkeleton from "./ProductCarourselSkeleton";

function ProductCarouselHydrationBoundary({
  title,
  params,
}: {
  title: string;
  params: URLSearchParams;
}) {
  return (
    <Suspense fallback={<ProductCarourselSkeleton title={title} />}>
      <ProductCarouselSection title={title} params={params} />
    </Suspense>
  );
}

export default ProductCarouselHydrationBoundary;
