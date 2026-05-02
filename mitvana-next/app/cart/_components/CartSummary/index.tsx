import { CartType } from "@/lib/types";
import CartCouponCode from "./CartCouponCode";
import CartCheckout from "./CartCheckout";
import { useAuthStore } from "@/lib/store/auth.store";
import CartLoginToCheckoutCheckout from "./CartLoginToCheckoutCheckout";

function CartSummary({
  sub_total_discounted_price,
  discount,
  coupon,
}: {
  sub_total_discounted_price: CartType["sub_total_discounted_price"];
  discount: CartType["discount"];
  coupon: CartType["coupon"];
}) {
  const authToken = useAuthStore((state) => state.authToken);
  return (
    <div className="flex flex-col md:flex-row py-5 form-comman md:mt-2 gap-4 md:gap-0">
      <div className="w-full md:w-1/2">
        <div className="flex">
          {authToken && <CartCouponCode coupon={coupon} />}
        </div>
      </div>
      <div className="w-full md:w-1/2 md:text-right mt-4 md:mt-0">
        {authToken ? (
          <CartCheckout
            sub_total_discounted_price={sub_total_discounted_price}
            discount={discount}
            coupon={coupon}
          />
        ) : (
          <CartLoginToCheckoutCheckout
            sub_total_discounted_price={sub_total_discounted_price}
          />
        )}
      </div>
    </div>
  );
}

export default CartSummary;
