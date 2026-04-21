"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import CustomPagination from "@/components/CustomPagination";
import { SearchParamType } from "@/lib/types";
import { FolderSearch } from "lucide-react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useSearchSuspenseQuery } from "../_lib/useSearchSuspenseQuery";
import EmptySection from "@/components/EmptySection";

const ARRAY_LIST = Array.from({ length: 10 }, (_, index) => index + 1);

export default function SearchList({ params }: { params: SearchParamType }) {
  const { data, isFetching, isRefetching } = useSearchSuspenseQuery(params);

  if (isFetching || isRefetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {ARRAY_LIST.map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (data.data.length === 0 || !params.search || params.search.length === 0) {
    return (
      <EmptySection
        title={
          params.search && params.search.length > 0
            ? "No Products Found"
            : "No Search Query"
        }
        description={
          params.search && params.search.length > 0
            ? `We couldn't find any products matching "${params.search}".`
            : "Please enter a search query."
        }
        Icon={FolderSearch}
      />
    );
  }
  return (
    <>
      <div className="mb-10 mt-3">
        <h1 className="text-2xl font-bold text-center">
          {data.meta.total} results found for "{params.search}"
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
        <CustomPagination totalCount={data.meta.total} />
      </div>
    </>
  );
}
