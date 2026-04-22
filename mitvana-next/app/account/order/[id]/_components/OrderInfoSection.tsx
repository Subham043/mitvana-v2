"use client";

import { Button } from "@/components/ui/button";
import OrderBilling from "./OrderBilling";
import OrderSummary from "./OrderSummary";
import { useOrderQuery } from "@/lib/data/queries/order";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import OrderCardPDFExportBtn from "../../_components/OrderCardPDFExportBtn";
import OrderCardCancelBtn from "../../_components/OrderCardCancelBtn";

function OrderInfoSection({ orderId }: { orderId: string }) {
  const { data, isLoading } = useOrderQuery(orderId, true);

  return (
    <div className="w-full">
      <div className="py-2 flex flex-col md:flex-row items-center justify-start md:justify-between gap-2 md:gap-0">
        <div className="flex-1 w-full md:w-auto">
          <h1 className="text-2xl font-bold text-[#194455]">Order Details!</h1>
          <p className="text-sm text-[#194455]">
            Here's everything you need to know about your order.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-start md:justify-end gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/account/order`}>Back</Link>
          </Button>
          {!isLoading && data !== undefined && (
            <>
              <OrderCardPDFExportBtn
                id={data.id}
                status={data.status}
                payment_status={
                  data.razorpay_payment ? data.razorpay_payment.status : null
                }
              />

              <OrderCardCancelBtn id={data.id} status={data.status} />
            </>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="text-center w-full flex items-center justify-center mt-3">
          <Spinner className="size-6" />
        </div>
      ) : (
        data !== undefined && (
          <div className="flex flex-col md:flex-row gap-5 mt-3 md:mt-0">
            <OrderSummary
              createdAt={data.createdAt}
              orderId={data.orderId}
              razorpay_payment={data.razorpay_payment}
              order_items={data.order_items}
              discounted_price={data.discounted_price}
              shipping_charges={data.shipping_charges}
              total_price={data.total_price}
              status={data.status}
            />
            <OrderBilling order_address={data.order_address} />
          </div>
        )
      )}
    </div>
  );
}

export default OrderInfoSection;
