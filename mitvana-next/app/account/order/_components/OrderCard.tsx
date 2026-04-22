"use client";

import { Card, CardDescription } from "@/components/ui/card";
import { OrderListType } from "@/lib/types";
import Link from "next/link";
import OrderCardPDFExportBtn from "./OrderCardPDFExportBtn";
import { Button } from "@/components/ui/button";
import OrderCardCancelBtn from "./OrderCardCancelBtn";
import dayjs from "dayjs";

type Props = {
  order: OrderListType;
};

function AddressCard({ order }: Props) {
  return (
    <Card className="w-full rounded-sm shadow-none p-0 gap-0">
      <CardDescription>
        <div className="text-[.875em]">
          <div className="flex flex-wrap justify-between items-start md:items-center p-2 gap-y-3 md:gap-y-0">
            <div className="w-auto md:w-1/6 flex flex-col justify-center gap-1">
              <h6 className="font-semibold text-[#194455]">
                Order Id : {order.orderId}
              </h6>
              <p className="text-[#878787]">
                Order Date: {dayjs(order.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex-1 flex text-[#194455] font-semibold justify-end md:justify-center text-right md:text-left">
              <span>
                ₹{order.total_price.toFixed(2)} for {order.total_order_products}{" "}
                orders
              </span>
            </div>
            <div className="w-full md:w-2/6 flex flex-row justify-between md:justify-end font-semibold gap-2 items-end">
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/account/order/${order.id}`}>View Order</Link>
              </Button>

              <OrderCardPDFExportBtn
                id={order.id}
                status={order.status}
                payment_status={
                  order.razorpay_payment ? order.razorpay_payment.status : null
                }
              />

              {/* {order.orderInvoice && ( */}
              <OrderCardCancelBtn id={order.id} status={order.status} />
            </div>
          </div>
          <div className="flex mt-3 gap-10 items-center">
            <div className="w-fit">
              <div
                className={`${
                  order.status.toLowerCase() === "delivered"
                    ? "bg-[#d4edda] text-[#155724]"
                    : "bg-[#f1dab8] text-[#bd7b17]"
                } py-1 tracking-wider flex justify-center font-semibold px-2`}
              >
                <span className="text-[10px]">
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 text-right md:text-left px-2">
              <p className="text-[#194455]">
                Your Order has been {order.status}
              </p>
            </div>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
}

export default AddressCard;
