function OrderSummary({ orderDetail }: { orderDetail: any }) {
  function formatISODate(isoDate: string) {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDate);

    // Format the date and time and return
    return date.toLocaleTimeString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    });
  }
  return (
    <div className="flex-1 bg-[#F7F7F7] py-3 px-3 rounded">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div className="border-t border-gray-300 my-3"></div>

      <div className="flex">
        <div className="flex-1 border-r border-gray-300">
          <p className="text-sm m-0">Date</p>
          <p className="text-sm font-semibold m-0">
            {formatISODate(orderDetail?.createdAt)}
          </p>
        </div>
        <div className="flex-1 border-r border-gray-300 px-3">
          <p className="text-sm m-0">Order Number</p>
          <p className="text-sm font-semibold m-0">{orderDetail?.orderID}</p>
        </div>
        <div className="flex-1 px-3">
          <p className="text-sm m-0">Payment Method</p>
          <p className="text-sm font-semibold">
            {"Online"}
            <br />
            <span className="text-xs">{orderDetail?.paymentResult?.id}</span>
          </p>
        </div>
      </div>
      <div className="border-t border-dashed border-gray-300 my-3"></div>

      {/* Order Items */}
      {orderDetail?.orderItems?.map((item: any, index: number) => (
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
                src={"https://api.mitvana.com/" + item?.product?.thumbnail}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item?.product?.productTitle}</h4>
              {item?.selectedColor && (
                <p className="text-xs" style={{ color: "#808B97" }}>
                  Color: {item?.selectedColor}
                </p>
              )}

              <p className="text-xs" style={{ color: "#808B97" }}>
                Qty: {item?.quantity}
              </p>
            </div>
          </div>
          <div className="text-end">
            <p className="font-semibold">
              ₹
              {item?.product?.discountedPrice
                ? parseInt(item?.product?.discountedPrice).toFixed(2)
                : parseInt(item?.product?.price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-300 my-3 w-full mx-auto"></div>
      <div className="w-full m-auto">
        <div className="flex items-center">
          <div className="w-1/4">
            <p>Sub Total</p>
          </div>
          <div className="w-3/4 text-end">
            <p>₹{orderDetail?.itemsPrice?.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="w-full m-auto mt-2">
        <div className="flex items-center">
          <div className="w-1/4">
            <p>Shipping</p>
          </div>
          <div className="w-3/4 text-end">
            <p>₹{orderDetail?.shippingPrice?.toFixed(2)}</p>
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
              ₹{orderDetail?.totalPrice?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
