"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCategoriesInfiniteQuery } from "@/lib/data/queries/category";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../ui/spinner";

function ShopMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, data } =
    useCategoriesInfiniteQuery(
      new URLSearchParams("is_visible_in_navigation=true"),
      true,
    );

  const loadMore = () => {
    if (isFetchingNextPage || isFetching) return;

    fetchNextPage({
      cancelRefetch: true,
    });
  };

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Link href="/shop">Shop</Link>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-56" ref={ref}>
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
            {(data ? data.pages : []).map((item, i) => {
              return (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={`/shop?category_slug=${item.slug}`}
                    className="cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </InfiniteScroll>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ShopMenu;
