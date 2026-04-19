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

const LIMIT_OPTIONS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

const PRODUCT_LIMIT_OPTIONS = [
  { value: 12, label: "12" },
  { value: 24, label: "24" },
  { value: 36, label: "36" },
  { value: 48, label: "48" },
];

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

  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || defaultLimit;

  const totalPages = Math.ceil(totalCount / limit);

  // Preserve existing query params
  const createPageURL = (newPage: number, newLimit: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", String(newPage));
    newParams.set("limit", String(newLimit));
    return `${pathname}?${newParams.toString()}`;
  };

  const createPageLimitURL = (newLimit: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", "1");
    newParams.set("limit", String(newLimit));
    return `${pathname}?${newParams.toString()}`;
  };

  // Show only nearby pages (window)
  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          defaultValue={String(limit)}
          onValueChange={(value) =>
            router.push(createPageLimitURL(Number(value)))
          }
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {type === "product"
                ? PRODUCT_LIMIT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))
                : LIMIT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page > 1) router.push(createPageURL(page - 1, limit));
              }}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Pages */}
          {pages.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => router.push(createPageURL(p, limit))}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (page < totalPages)
                  router.push(createPageURL(page + 1, limit));
              }}
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CustomPagination;
