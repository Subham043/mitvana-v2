import { CartType } from "@/lib/types";

function CartSummary({
  total_price,
}: {
  total_price: CartType["total_price"];
}) {
  return (
    <div className="flex flex-col md:flex-row py-5 form-comman md:mt-10 gap-4 md:gap-0">
      <div className="w-full md:w-1/2">
        <div className="flex">
          <div className="w-full md:w-1/2">
            <label className="text-sm mt-3 mb-2" htmlFor="coupon" role="button">
              Coupon:
            </label>
            <p className="text-[#878787] text-sm">
              Coupon code will work on checkout page
            </p>
            <div className="flex items-center gap-3 justify-start mt-2 md:mt-5">
              <input
                className="w-full md:w-[250px] rounded-0 border border-[#dee2e6] p-2"
                id="coupon"
                type="text"
                aria-label="default input example"
                placeholder="Coupon code"
              />
              {/* {couponCode ? (
                  <button
                    type="submit"
                    className=" btn btn-sm btn-danger rounded-pill mb-3 mt-3"
                    onClick={handleClearCoupon}
                    disabled={!couponCode}
                  >
                    X
                  </button>
                ) : (
                  ""
                )} */}
            </div>
            <button
              type="submit"
              className="bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[120px]"
              //   onClick={handleApplyCoupon}
              //   disabled={!couponCode}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 md:text-right mt-4 md:mt-0">
        {/* {responseforCoupun && (
            <div>
              <h3 style={{ color: "red" }}>
                Discount Applied {responseforCoupun.discountPercentage}%
              </h3>
              <h5 className="afacad-flux fs-20 mb-1 mt-1">
                ₹
                <span style={{ textDecoration: "line-through" }}>
                  {parseFloat(cartDetail?.totalPrice).toFixed(2)}
                </span>
              </h5>
              <h5 className="afacad-flux fs-20 mb-3">
                DISCOUNTED PRICE : ₹
                {token
                  ? (() => {
                      const subtotal = parseFloat(cartDetail?.totalPrice) || 0;
                      const discount =
                        (subtotal * responseforCoupun.discountPercentage) / 100;
                      const finalPrice = (subtotal - discount).toFixed(2);
                      return finalPrice;
                    })()
                  : totalPrice}
              </h5>
            </div>
          )} */}
        <h5 className="text-lg font-semibold mb-3">
          SUBTOTAL : ₹{parseFloat(total_price.toString()).toFixed(2) || 0}
        </h5>
        <p className="text-[#878787] mb-2 text-md">
          Taxes, shipping and discounts codes calculated at checkout
        </p>
        <div className="text-[#878787] mb-3 text-md flex gap-2 items-center justify-start md:justify-end">
          <input
            className="form-check-input rounded-0"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            //   checked={isChecked}
            //   onChange={handleCheckboxChange}
          />
          <label
            htmlFor="flexCheckChecked"
            role="button"
            className="ms-1 work-sans"
          >
            I agree with the terms and conditions.
          </label>
        </div>
        {/* <Link href={isChecked && orderId ? `/checkout?order=${orderId}` : "#"}> */}
        <button
          type="submit"
          className=" bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[170px]"
          // disabled={!isChecked}
          // onClick={token ? handleOrderCreate : handleLoginShow}
        >
          CHECK OUT
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default CartSummary;
