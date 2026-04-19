"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type SortOption = {
  label: string;
  sort_by: string;
  sort_order: "asc" | "desc";
};

const SORT_OPTIONS: SortOption[] = [
  { label: "Name, low to high", sort_by: "title", sort_order: "asc" },
  { label: "Name, high to low", sort_by: "title", sort_order: "desc" },
  { label: "Price, low to high", sort_by: "price", sort_order: "asc" },
  { label: "Price, high to low", sort_by: "price", sort_order: "desc" },
  { label: "Date, old to new", sort_by: "createdAt", sort_order: "asc" },
  { label: "Date, new to old", sort_by: "createdAt", sort_order: "desc" },
];

function ProductSortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Get current selected label
  const currentSortSelected = useMemo(() => {
    const sort_by = searchParams.get("sort_by");
    const sort_order = searchParams.get("sort_order");

    const found = SORT_OPTIONS.find(
      (opt) => opt.sort_by === sort_by && opt.sort_order === sort_order,
    );

    return found?.label || "Sort By";
  }, [searchParams]);

  // ✅ URL builder
  const createSortURL = (sort_by: string, sort_order: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", "1");
    newParams.set("sort_by", sort_by);
    newParams.set("sort_order", sort_order);

    return `/shop?${newParams.toString()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currentSortSelected}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={() =>
              router.push(createSortURL(option.sort_by, option.sort_order))
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductSortFilter;
