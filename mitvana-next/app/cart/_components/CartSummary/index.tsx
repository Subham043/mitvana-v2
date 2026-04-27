import { CartType } from "@/lib/types";
import CartCouponCode from "./CartCouponCode";
import CartCheckout from "./CartCheckout";
import { useAuthStore } from "@/lib/store/auth.store";
import CartLoginToCheckoutCheckout from "./CartLoginToCheckoutCheckout";

function CartSummary({
  total_price,
}: {
  total_price: CartType["total_price"];
}) {
  const authToken = useAuthStore((state) => state.authToken);
  return (
    <div className="flex flex-col md:flex-row py-5 form-comman md:mt-10 gap-4 md:gap-0">
      <div className="w-full md:w-1/2">
        <div className="flex">{authToken && <CartCouponCode />}</div>
      </div>
      <div className="w-full md:w-1/2 md:text-right mt-4 md:mt-0">
        {authToken ? (
          <CartCheckout total_price={total_price} />
        ) : (
          <CartLoginToCheckoutCheckout total_price={total_price} />
        )}
      </div>
    </div>
  );
}

export default CartSummary;
