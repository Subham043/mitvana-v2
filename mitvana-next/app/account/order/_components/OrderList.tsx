"use client";

import OrderCard from "./OrderCard";
import CustomPagination from "@/components/CustomPagination";
import { useOrdersQuery } from "@/lib/data/queries/order";
import { Spinner } from "@/components/ui/spinner";
import EmptySection from "@/components/EmptySection";
import { FolderCode } from "lucide-react";
import OrderFilter from "./OrderFilter";

function OrderList() {
  const { data, isLoading } = useOrdersQuery();
  return (
    <div className="w-full">
      <div className="py-2 flex flex-row items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#194455]">Orders</h1>
          <p className="text-sm text-[#194455]">
            Track your orders and returns.
          </p>
        </div>
        <OrderFilter />
      </div>
      <div className="w-full flex flex-col gap-5">
        {isLoading ? (
          <div className="text-center w-full flex items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            {data.data.map((item) => (
              <OrderCard order={item} key={item.id} />
            ))}
            <CustomPagination totalCount={data.meta.total} />
          </>
        ) : (
          <EmptySection
            title="No Orders Yet"
            description="You haven't placed any order yet. Get started by placing your first order."
            Icon={FolderCode}
          />
        )}
      </div>
    </div>
  );
}

export default OrderList;
