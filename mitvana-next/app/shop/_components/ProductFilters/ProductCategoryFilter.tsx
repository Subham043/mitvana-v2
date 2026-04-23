"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCategoriesInfiniteQuery } from "@/lib/data/queries/category";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@/components/ui/spinner";
import { useRef } from "react";

function ProductCategoryFilter() {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const currentCategory = searchParams.get("category_slug");

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, data } =
    useCategoriesInfiniteQuery(new URLSearchParams(), true);

  const createCategoryURL = (category_slug: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", "1");

    if (category_slug) {
      newParams.set("category_slug", category_slug);
    } else {
      newParams.delete("category_slug");
    }

    return `/shop?${newParams.toString()}`;
  };

  const loadMore = () => {
    if (isFetchingNextPage || isFetching) return;

    fetchNextPage({
      cancelRefetch: true,
    });
  };

  return (
    <div
      className="max-h-[250px] overflow-y-auto"
      id="categoryScrollableDiv"
      ref={ref}
    >
      <InfiniteScroll
        dataLength={(data?.pages ?? []).length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={
          isFetchingNextPage || isFetching ? (
            <div className="text-center w-full flex items-center justify-center">
              <Spinner className="size-6" />
            </div>
          ) : undefined
        }
        scrollableTarget={ref.current}
        className="max-h-[250px]"
      >
        <div className="flex flex-col gap-3">
          {(data ? data.pages : []).map((item, i) => {
            const isActive = currentCategory === item.slug;

            return (
              <Link
                key={item.id}
                href={createCategoryURL(item.slug)}
                className={`text-sm transition ${
                  isActive
                    ? "text-[#193A43] font-semibold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ProductCategoryFilter;
