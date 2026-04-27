import { CartType } from "@/lib/types";
import Link from "next/link";

function CartLoginToCheckoutCheckout({
  total_price,
}: {
  total_price: CartType["total_price"];
}) {
  return (
    <>
      <h5 className="text-lg font-semibold mb-3">
        SUBTOTAL : ₹{parseFloat(total_price.toString()).toFixed(2) || 0}
      </h5>
      <p className="text-[#878787] mb-4 text-md">
        Taxes, shipping and discounts codes calculated at checkout
      </p>
      <Link
        href="/auth/login"
        className=" bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[170px]"
      >
        LOGIN TO CHECKOUT
      </Link>
    </>
  );
}

export default CartLoginToCheckoutCheckout;
