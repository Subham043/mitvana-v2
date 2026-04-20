"use client";

import ProductInfoTopSection from "./ProductInfoTopSection";
import ProductTabSection from "./ProductTabSection";
import ProductRecommendation from "./ProductRecommendation";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ProductSlugQueryFn,
  ProductSlugQueryKey,
} from "@/lib/data/queries/product";
import ProductInfoPageSkeleton from "./ProductInfoPageSkeleton";

function ProductInfoSection({ slug }: { slug: string }) {
  const { data, isFetching, isRefetching } = useSuspenseQuery({
    queryKey: ProductSlugQueryKey(slug),
    queryFn: ({ signal }) =>
      ProductSlugQueryFn({
        slug,
        signal,
      }),
  });

  console.log(data);

  if (isFetching || isRefetching) {
    return <ProductInfoPageSkeleton />;
  }

  return (
    <div>
      <div className="container mx-auto max-w-[90%]">
        <ProductInfoTopSection productInfoData={data} />
      </div>
      <div className="bg-[#f6f6f8]">
        <div className="container mx-auto max-w-[90%]">
          <ProductTabSection productInfoData={data} />
        </div>
      </div>
      <div className="container mx-auto max-w-[90%]">
        <ProductRecommendation relatedProducts={[]} />
      </div>
    </div>
  );
}

export default ProductInfoSection;
