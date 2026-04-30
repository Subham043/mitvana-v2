import { CartType } from "@/lib/types";
import { useRemoveCouponMutation } from "@/lib/data/mutations/cart";
import { Spinner } from "@/components/ui/spinner";

function ClearCouponCode({ coupon }: { coupon: CartType["coupon"] }) {
  const removeCouponMutation = useRemoveCouponMutation();
  if (!coupon) return;
  return (
    <button
      type="button"
      className={`bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[160px] ${removeCouponMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => removeCouponMutation.mutateAsync()}
      disabled={removeCouponMutation.isPending}
    >
      {removeCouponMutation.isPending ? (
        <Spinner className="mx-auto" />
      ) : (
        "Remove Coupon"
      )}
    </button>
  );
}

export default ClearCouponCode;
