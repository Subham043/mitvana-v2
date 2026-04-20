"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";

const LIMIT_OPTIONS = [10, 20, 30, 40, 50];
const PRODUCT_LIMIT_OPTIONS = [12, 24, 36, 48];

function CustomPagination({
  totalCount,
  defaultLimit = 10,
  type = "default",
}: {
  totalCount: number;
  defaultLimit?: number;
  type?: "default" | "product";
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || defaultLimit;

  const totalPages = Math.ceil(totalCount / limit);

  // ✅ Single helper
  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`);
    });
  };

  // ✅ Pagination window logic (cleaner)
  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (page > 3) pages.push("...");

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const limitOptions =
    type === "product" ? PRODUCT_LIMIT_OPTIONS : LIMIT_OPTIONS;

  if (isPending)
    return (
      <div className="flex items-center justify-center gap-4">
        <Spinner className="size-6" />
      </div>
    );
  return (
    <div className="flex items-center justify-between gap-4">
      {/* ✅ Controlled Select */}
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="rows">Rows per page</FieldLabel>
        <Select
          value={String(limit)}
          onValueChange={(value) => updateParams({ page: "1", limit: value })}
        >
          <SelectTrigger className="w-20" id="rows">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {limitOptions.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* ✅ Pagination */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                page > 1 &&
                updateParams({ page: String(page - 1), limit: String(limit) })
              }
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Pages */}
          {pages.map((p) => (
            <PaginationItem key={p.toString()}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() =>
                    updateParams({
                      page: String(p),
                      limit: String(limit),
                    })
                  }
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                page < totalPages &&
                updateParams({ page: String(page + 1), limit: String(limit) })
              }
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* ✅ Optional loader */}
    </div>
  );
}

export default CustomPagination;
