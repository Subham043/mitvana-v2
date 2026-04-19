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
import { Spinner } from "@/components/ui/spinner";
import { SearchParamType } from "@/lib/types";

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
      <div className="text-center w-full flex items-center justify-center">
        <Spinner className="size-6" />
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
          <ProductCard key={product.id} product={product} />
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
