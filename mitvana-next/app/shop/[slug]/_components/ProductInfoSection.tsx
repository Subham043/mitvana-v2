"use client";

import ProductInfoTopSection from "./ProductInfoTopSection";
import ProductTabSection from "./ProductTabSection";
import ProductRecommendation from "./ProductRecommendation";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductInfoPageSkeleton from "./ProductInfoPageSkeleton";
import { ProductSlugQueryOptions } from "@/lib/data/queries/product";

function ProductInfoSection({ slug }: { slug: string }) {
  const { data, isFetching, isRefetching } = useSuspenseQuery(
    ProductSlugQueryOptions(slug),
  );

  if (isFetching || isRefetching) {
    return <ProductInfoPageSkeleton />;
  }

  return (
    <div>
      <div className="container mx-auto max-w-[90%]">
        <ProductInfoTopSection
          title={data.title}
          sub_title={data.sub_title}
          reviews_count={data.reviews_count}
          discounted_price={data.discounted_price}
          price={data.price}
          saved_price={data.saved_price}
          saved_percentage={data.saved_percentage}
          child_products={data.child_products}
          product_images={data.product_images}
          thumbnail_link={data.thumbnail_link}
        />
      </div>
      <div className="bg-[#f6f6f8]">
        <div className="container mx-auto max-w-[90%]">
          <ProductTabSection productInfoData={data} />
        </div>
      </div>
      <div className="container mx-auto max-w-[90%]">
        <ProductRecommendation related_products={data.related_products} />
      </div>
    </div>
  );
}

export default ProductInfoSection;
