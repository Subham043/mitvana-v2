function CartProductList({ cartDetail }: { cartDetail: any }) {
  return (
    <>
      <div className="flex border-b pb-2 px-4">
        {/* Header Row */}
        <div className="w-1/2 text-sm">PRODUCT</div>
        <div className="w-1/4 text-sm">PRICE</div>
        <div className="w-1/4 text-sm">QUANTITY</div>
        <div className="w-1/4 text-sm text-right">TOTAL</div>
      </div>
      {true ? (
        <>
          {cartDetail?.map((item: any) => {
            const itemId = item?.product?._id;
            return (
              <div
                key={itemId}
                className="flex items-center py-3 border-b px-4"
              >
                <div className="w-1/2">
                  <div className="flex gap-3 items-start">
                    <img
                      src={
                        "https://api.mitvana.com/" + item?.product?.thumbnail
                      }
                      alt=""
                      width={70}
                      className="h-20 object-cover"
                    />
                    <div>
                      <h6 className="m-0 p-0 font-semibold text-sm">
                        {item?.product?.name}
                      </h6>
                      <div className="flex flex-col gap-2">
                        {item?.selectedColor?.parentColor && (
                          <p className="text-sm">
                            Color: {item?.selectedColor?.parentColor}
                          </p>
                        )}
                        <button
                        //   onClick={() =>
                        //     handleRemoveProduct(item?.product?._id)
                        //   }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="red"
                            className="bi bi-trash-fill mt-[10px]"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 text-sm">
                  {/* Product Price */}₹
                  {item?.product?.discountedPrice
                    ? item?.product?.discountedPrice
                    : item?.product?.price}
                </div>
                <div className="w-1/4">
                  {/* Quantity Controls */}
                  <div className="inline-flex p-4 h-10 border rounded-full items-center justify-between">
                    <button className="text-lg hover:cursor-pointer hover:text-red-500">
                      −
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={item?.quantity}
                      className="w-20 text-center border-none outline-none"
                    />
                    <button className="text-lg hover:cursor-pointer hover:text-green-500">
                      +
                    </button>
                  </div>
                </div>
                <div className="w-1/4 text-right text-sm">
                  {/* Total Price */}₹
                  {(
                    (item?.product?.discountedPrice
                      ? item?.product?.discountedPrice
                      : item?.product?.price) * item?.quantity
                  ).toFixed(2)}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {cartDetail &&
            cartDetail?.map((item: any) => {
              const itemId = item?.productId;
              return (
                <div
                  key={itemId}
                  className="flex align-items-center py-3 border-bottom"
                >
                  <div className="w-1/2">
                    <div className="flex gap-3 align-items-start">
                      <img
                        style={{ height: "5rem" }}
                        src={"https://api.mitvana.com/" + item?.thumbnail}
                        alt=""
                        width={70}
                      />
                      <div>
                        <h6>{item?.productTitle}</h6>
                        <div className="flex flex-col gap-2">
                          {item?.selectedColor?.parentColor && (
                            <p>Color: {item?.selectedColor?.parentColor}</p>
                          )}
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-trash-fill mt-[10px]"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4">
                    {/* Product Price */}₹{item?.discountedPrice || item?.price}
                  </div>
                  <div className="w-1/4">
                    {/* Quantity Controls */}
                    <div className="input-step border rounded-full ">
                      <button>−</button>
                      <input type="text" readOnly value={item?.quantity} />
                      <button>+</button>
                    </div>
                  </div>
                  <div className="w-1/4">
                    {/* Total Price */}₹
                    {(
                      (item?.discountedPrice || item?.price) *
                      (item?.quantity || 1)
                    ).toFixed(2)}
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}

export default CartProductList;
