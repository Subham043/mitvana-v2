"use client";

import { Card, CardDescription } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  order: any;
};

function AddressCard({ order }: Props) {
  const totalQuantity = order?.orderItems?.reduce(
    (acc: number, curr: any) => acc + curr.quantity,
    0,
  );
  const orderDate = new Date(order?.createdAt).toLocaleDateString();
  return (
    <Card className="w-full rounded-sm shadow-none p-0 gap-0">
      <CardDescription>
        <div className="text-[.875em]">
          <div className="flex justify-between items-center p-2">
            <div className="w-1/6 flex flex-col justify-center gap-1">
              <h6 className="font-semibold text-[#194455]">
                Order Id : {order?.orderID}
              </h6>
              <p className="text-[#878787]">Order Date: {orderDate}</p>
            </div>
            <div className="flex-1 flex text-[#194455] font-semibold justify-center">
              <span>
                ₹{order?.totalPrice?.toFixed(2)} for {totalQuantity} orders
              </span>
            </div>
            <div className="w-2/6 flex flex-col md:flex-row justify-between font-semibold gap-2 items-end">
              <Link
                href={`/account/order/${order?._id}`}
                className="text-[#194455] border-[#194455] text-center border-2 w-32 py-1"
              >
                View Order
              </Link>

              {!order?.orderStatus?.includes("Cancelled") &&
                order?.orderStatus !== "Dispatched" &&
                order?.orderStatus != "Delivered" && (
                  <button
                    className="text-[#194455] bg-[#fbf4e1] w-32 py-1 font-medium cursor-pointer"
                    // onClick={() => handleCancelOrder(order)}
                    disabled={
                      order?.orderStatus === "Dispatched" ||
                      order?.orderStatus === "Delivered" ||
                      order?.orderStatus === "Cancelled by Admin"
                    }
                  >
                    Cancel Order
                  </button>
                )}

              {/* {order?.orderInvoice && ( */}
              {true && (
                <button
                  // onClick={() => handleDownload(order)}
                  className="border-2 w-32 py-1 font-medium cursor-pointer"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
          <div className="flex mt-3 gap-10">
            <div className="w-fit">
              <div
                className={`${
                  order?.orderStatus?.toLowerCase() === "delivered"
                    ? "bg-[#d4edda] text-[#155724]"
                    : "bg-[#f1dab8] text-[#bd7b17]"
                } py-1 tracking-wider flex justify-center font-semibold px-2`}
              >
                <span className="text-[10px]">
                  {order?.orderStatus?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#194455]">
                Your Order has been {order?.orderStatus}
              </p>
            </div>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
}

export default AddressCard;
