"use client";

import CustomPagination from "@/components/CustomPagination";
import ProductCard from "./ProductCard";
import { FolderCode } from "lucide-react";
import { SearchParamType } from "@/lib/types";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { usePublishedProductsSuspenseQuery } from "../_lib/usePublishedProductsSuspenseQuery";
import EmptySection from "@/components/EmptySection";

const ARRAY_LIST = Array.from({ length: 8 }, (_, index) => index + 1);

export default function ProductList({ params }: { params: SearchParamType }) {
  const { data, isFetching, isRefetching } =
    usePublishedProductsSuspenseQuery(params);

  if (isFetching || isRefetching) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {ARRAY_LIST.map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <EmptySection
        title="No Products Found"
        description="We couldn't find any products matching your criteria."
        Icon={FolderCode}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.data.map((product) => (
          <ProductCard
            key={product.id}
            thumbnail={product.thumbnail}
            thumbnail_link={product.thumbnail_link}
            product_images={product.product_images}
            slug={product.slug}
            title={product.title}
            name={product.name}
            stock={product.stock}
            tags={product.tags}
            price={product.price}
            discounted_price={product.discounted_price}
          />
        ))}
      </div>
      <div className="mt-5">
        <CustomPagination
          totalCount={data.meta.total}
          type="product"
          defaultLimit={12}
        />
      </div>
    </>
  );
}
