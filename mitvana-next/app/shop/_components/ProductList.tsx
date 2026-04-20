"use client";

import CustomPagination from "@/components/CustomPagination";
import ProductCard from "./ProductCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  PublishedProductsQueryFn,
  PublishedProductsQueryKey,
} from "@/lib/data/queries/product";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderCode } from "lucide-react";
import { SearchParamType } from "@/lib/types";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ARRAY_LIST = Array.from({ length: 8 }, (_, index) => index + 1);

export default function ProductList({ params }: { params: SearchParamType }) {
  const { data, isFetching, isRefetching } = useSuspenseQuery({
    queryKey: PublishedProductsQueryKey(params as unknown as URLSearchParams),
    queryFn: ({ signal }) =>
      PublishedProductsQueryFn({
        params: params as unknown as URLSearchParams,
        signal,
      }),
  });

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
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderCode />
          </EmptyMedia>
          <EmptyTitle>No Products Found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find any products matching your criteria.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
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
