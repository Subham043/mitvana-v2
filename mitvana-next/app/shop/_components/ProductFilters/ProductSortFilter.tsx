"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchParamType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

function ProductSortFilter({ params }: { params: SearchParamType }) {
  const router = useRouter();

  const currentSortSelected = useMemo(() => {
    if (params.sort_by && params.sort_order) {
      if (params.sort_by === "title") {
        return params.sort_order === "asc"
          ? "Name, low to high"
          : "Name, high to low";
      }
      if (params.sort_by === "price") {
        return params.sort_order === "asc"
          ? "Price, low to high"
          : "Price, high to low";
      }
      if (params.sort_by === "createdAt") {
        return params.sort_order === "asc"
          ? "Date, old to new"
          : "Date, new to old";
      }
    }
    return "Sort By";
  }, [params]);

  const createSortURL = (sort_by: string, sort_order: string) => {
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "string") {
        newParams.set(key, value);
      }
    });

    newParams.set("page", "1");
    newParams.set("sort_by", sort_by);
    newParams.set("sort_order", sort_order);
    return `/shop?${newParams.toString()}`;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle"
      >
        <Button variant="outline">{currentSortSelected}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-menu filter-dropdown">
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("title", "asc"))}
        >
          Name, low to high
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("title", "desc"))}
        >
          Name, high to low
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("price", "asc"))}
        >
          Price, low to high
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("price", "desc"))}
        >
          Price, high to low
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("createdAt", "asc"))}
        >
          Date, old to new
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(createSortURL("createdAt", "desc"))}
        >
          Date, new to old
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductSortFilter;
