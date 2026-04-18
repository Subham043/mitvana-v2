function OrderBilling({ orderDetail }: { orderDetail: any }) {
  return (
    <div
      className="w-full md:w-[20%] h-fit border border-gray-300 border-dashed rounded p-3 overflow-hidden
  border-t-[3px] border-t-[#194455]
  [border-top-style:solid] bg-white"
    >
      <h1 className="text-xl font-semibold mb-4">Billing Address</h1>

      <div className="mb-2 ">
        <p className="text-sm text-[#808B97]">Name:</p>
        <p className="text-lg">
          {orderDetail?.shippingAddress?.firstName +
            " " +
            orderDetail?.shippingAddress?.lastName}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Address:</p>
        <p className="text-lg">
          {orderDetail?.shippingAddress?.address},{" "}
          {orderDetail?.shippingAddress?.city},{" "}
          {orderDetail?.shippingAddress?.state},{" "}
          {orderDetail?.shippingAddress?.country}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Phone:</p>
        <p className="text-lg">{orderDetail?.shippingAddress?.phoneNumber}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Email:</p>
        <p className="text-lg">{orderDetail?.user?.email}</p>
      </div>
      {/* {orderDetail?.orderStatus !== "Cancelled By user" ? (
        <div className="my-4 md:flex gap-4">
          <Button
            type="button"
            // onClick={() => handleDownload(orderDetail)}
            className="btn btn-teal my-3 px-3 py-2 fw-bold rounded-pill w-full"
          >
            Download Invoice
          </Button>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          Order Cancelled By user
        </div>
      )} */}
    </div>
  );
}

export default OrderBilling;
