import { CartType } from "@/lib/types";
import CouponForm from "./CouponForm";
import CouponApplied from "./CouponApplied";

function CartCouponCode({ coupon }: { coupon: CartType["coupon"] }) {
  if (coupon) return <CouponApplied coupon={coupon} />;
  else return <CouponForm />;
}

export default CartCouponCode;
