import { OrderInfoType } from "@/lib/types";
import dayjs from "dayjs";
import { useMemo } from "react";

type Props = {
  createdAt: OrderInfoType["createdAt"];
  orderId: OrderInfoType["orderId"];
  razorpay_payment: OrderInfoType["razorpay_payment"];
  order_items: OrderInfoType["order_items"];
  discounted_price: OrderInfoType["discounted_price"];
  shipping_charges: OrderInfoType["shipping_charges"];
  total_price: OrderInfoType["total_price"];
  status: OrderInfoType["status"];
};

function OrderSummary({
  createdAt,
  orderId,
  razorpay_payment,
  order_items,
  discounted_price,
  shipping_charges,
  total_price,
  status,
}: Props) {
  const itemsPrice = useMemo(() => {
    return order_items?.reduce((acc: number, item: any) => {
      const price = item.product_discounted_price
        ? parseFloat(item.product_discounted_price.toString())
        : parseFloat(item.product_price.toString());
      return acc + price * item.quantity;
    }, 0);
  }, [order_items]);

  return (
    <div className="flex-1 bg-[#F7F7F7] relative">
      <div className="w-fit">
        <div
          className={`${
            status.toLowerCase() === "delivered"
              ? "bg-[#d4edda] text-[#155724]"
              : "bg-[#f1dab8] text-[#bd7b17]"
          } py-1 tracking-wider flex justify-center font-semibold px-2 absolute right-0 top-0`}
        >
          <span className="text-[10px]">{status.toUpperCase()}</span>
        </div>
      </div>
      <div className="w-full py-3 px-3 rounded">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="border-t border-gray-300 my-3"></div>

        <div className="flex">
          <div className="flex-1 border-r border-gray-300">
            <p className="text-sm m-0">Date</p>
            <p className="text-sm font-semibold m-0">
              {dayjs(createdAt).format("DD MMMM YYYY \at HH:mm:ss")}
            </p>
          </div>
          <div className="flex-1 border-r border-gray-300 px-3">
            <p className="text-sm m-0">Order Number</p>
            <p className="text-sm font-semibold m-0">{orderId}</p>
          </div>
          <div className="flex-1 px-3">
            <p className="text-sm m-0">Payment Method</p>
            <p className="text-sm font-semibold">
              {"Online"}
              {razorpay_payment && (
                <span className="ml-1 text-xs">
                  ({razorpay_payment?.razorpay_payment_id})
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="border-t border-dashed border-gray-300 my-3"></div>

        {/* Order Items */}
        {order_items?.map(
          (item: OrderInfoType["order_items"][0], index: number) => (
            <div
              className="flex m-auto mb-3 justify-between items-center gap-2"
              key={index}
            >
              <div className="flex-1 flex gap-3 items-center">
                <div
                  className="w-auto border p-0"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <img
                    style={{ height: "4rem", objectFit: "cover" }}
                    alt=""
                    width={100}
                    src={
                      item.product_image_link
                        ? item.product_image_link
                        : undefined
                    }
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product_title}</h4>
                  {item.color_name && (
                    <p className="text-xs" style={{ color: "#808B97" }}>
                      Color: {item.color_name}
                    </p>
                  )}

                  <p className="text-xs" style={{ color: "#808B97" }}>
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-end">
                <p className="font-semibold">
                  ₹
                  {item.product_discounted_price
                    ? parseInt(
                        item.product_discounted_price.toString(),
                      ).toFixed(2)
                    : parseInt(item.product_price.toString()).toFixed(2)}
                </p>
              </div>
            </div>
          ),
        )}
        <div className="border-t border-gray-300 my-3 w-full mx-auto"></div>
        <div className="w-full m-auto">
          <div className="flex items-center">
            <div className="w-1/4">
              <p>Sub Total</p>
            </div>
            <div className="w-3/4 text-end">
              <p>₹{itemsPrice?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="w-full m-auto mt-2">
          <div className="flex items-center">
            <div className="w-1/4">
              <p>Shipping</p>
            </div>
            <div className="w-3/4 text-end">
              <p>₹{shipping_charges?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-3 w-full mx-auto"></div>
        <div className="w-full m-auto mt-2">
          <div className="flex items-center">
            <div className="w-1/4">
              <p className="text-lg font-semibold">Order Total</p>
            </div>
            <div className="w-3/4 text-end">
              <p className="text-lg font-semibold">
                ₹
                {(discounted_price ? discounted_price : total_price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
