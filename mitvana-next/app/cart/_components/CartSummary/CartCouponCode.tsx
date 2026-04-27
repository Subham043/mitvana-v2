function CartCouponCode() {
  return (
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
  );
}

export default CartCouponCode;
