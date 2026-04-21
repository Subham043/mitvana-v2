import { Star } from "lucide-react";
import { ProductType } from "@/lib/types";
import { useAllApprovedProductReviewsQuery } from "@/lib/data/queries/product_review";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

dayjs.extend(relativeTime);

function CommentSection({ id }: { id: ProductType["id"] }) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const { data } = useAllApprovedProductReviewsQuery(
    id,
    new URLSearchParams(`page=${page}&limit=${limit}`),
    true,
  );
  if (!data || data.data.length === 0) return null;

  return (
    <>
      <div className="mt-5 flex flex-col gap-3">
        {data.data.map((item) => (
          <div
            className="bg-white rounded-lg shadow-xs border p-4"
            key={item.id}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400 text-white font-semibold">
                S
              </div>
              <div className="flex flex-col justify-center gap-0">
                <span className="font-semibold text-gray-800">
                  {item.user.name}
                </span>
                <span className="text-gray-800 text-xs">{item.user.email}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-2">
              <span className="flex gap-1 items-center">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </span>
            </div>

            {/* Title */}
            <h6 className="font-semibold text-gray-900 mb-1">{item.title}</h6>

            {/* Comment */}
            {item.comment && (
              <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                {item.comment}
              </p>
            )}

            {/* Date */}
            <p className="text-xs text-gray-400">
              {dayjs(item.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={page === Math.ceil(data.meta.total / limit)}
                onClick={() => setPage((prev) => prev + 1)}
                className={
                  page === Math.ceil(data.meta.total / limit)
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default CommentSection;
