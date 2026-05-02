import { useApplyCouponMutation } from "@/lib/data/mutations/cart";
import { useForm } from "react-hook-form";
import {
  ApplyCouponFormValuesType,
  applyCouponSchema,
} from "@/lib/data/schemas/cart";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { handleFormServerErrors } from "@/lib/helper";
import { Spinner } from "@/components/ui/spinner";
import { FieldError } from "@/components/ui/field";

function CouponForm() {
  const applyCouponMutation = useApplyCouponMutation();

  const form = useForm<ApplyCouponFormValuesType>({
    resolver: yupResolver(applyCouponSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await applyCouponMutation.mutateAsync(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
      });
    }),
    [form.handleSubmit, applyCouponMutation.mutate],
  );
  return (
    <form onSubmit={onSubmit} className="w-full md:w-1/2">
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
          {...form.register("coupon_code")}
        />
      </div>
      {form.formState.errors.coupon_code?.message && (
        <FieldError
          errors={[{ message: form.formState.errors.coupon_code?.message }]}
        />
      )}
      <button
        type="submit"
        className={`bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[120px] ${applyCouponMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={applyCouponMutation.isPending}
      >
        {applyCouponMutation.isPending ? (
          <Spinner className="mx-auto" />
        ) : (
          "Apply"
        )}
      </button>
    </form>
  );
}

export default CouponForm;
