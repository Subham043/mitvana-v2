import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import dayjs from "dayjs";

function OrderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Get current selected label
  const currentSelected = useMemo(() => {
    const from_date = searchParams.get("from_date");
    const to_date = searchParams.get("to_date");

    if (from_date && to_date) {
      const from = dayjs(from_date);
      const to = dayjs(to_date);
      const now = dayjs();

      if (
        from.isSame(now.subtract(3, "month"), "day") &&
        to.isSame(now, "day")
      ) {
        return "Last 3 Months";
      }

      if (
        from.isSame(now.subtract(6, "month"), "day") &&
        to.isSame(now, "day")
      ) {
        return "Last 6 Months";
      }

      if (
        from.isSame(now.subtract(1, "year"), "day") &&
        to.isSame(now, "day")
      ) {
        return "Last 1 Year";
      }
    }

    return "Filter";
  }, [searchParams]);

  // ✅ URL builder
  const createSortURL = (from_date: string, to_date: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", "1");
    newParams.set("from_date", from_date);
    newParams.set("to_date", to_date);

    return `/account/order?${newParams.toString()}`;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle"
      >
        <Button variant="outline" className="cursor-pointer">
          {currentSelected}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-menu filter-dropdown">
        <DropdownMenuItem
          onClick={() =>
            router.push(
              createSortURL(
                dayjs().subtract(3, "month").format("YYYY-MM-DD"),
                dayjs().format("YYYY-MM-DD"),
              ),
            )
          }
        >
          Last 3 Months
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              createSortURL(
                dayjs().subtract(6, "month").format("YYYY-MM-DD"),
                dayjs().format("YYYY-MM-DD"),
              ),
            )
          }
        >
          Last 6 Months
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              createSortURL(
                dayjs().subtract(1, "year").format("YYYY-MM-DD"),
                dayjs().format("YYYY-MM-DD"),
              ),
            )
          }
        >
          Last 1 Year
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/order")}>
          All Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderFilter;
