import { CartType } from "@/lib/types";
import ClearCouponCode from "./ClearCouponCode";

function CouponApplied({ coupon }: { coupon: CartType["coupon"] }) {
  if (!coupon) return null;
  return (
    <div>
      <h5 className="text-lg text-green-500">
        COUPON APPLIED: {coupon.code} - {coupon.discount_percentage}% off
      </h5>
      <ClearCouponCode coupon={coupon} />
    </div>
  );
}

export default CouponApplied;
