import { CartType } from "@/lib/types";
import { useCartCheckout } from "../../_lib/useCartCheckout";
import { FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";

function CartCheckout({
  sub_total_discounted_price,
  discount,
  coupon,
}: {
  sub_total_discounted_price: CartType["sub_total_discounted_price"];
  discount: CartType["discount"];
  coupon: CartType["coupon"];
}) {
  const { form, onSubmit } = useCartCheckout();

  return (
    <>
      {coupon && (
        <div>
          <h5 className="text-lg text-red-500 mb-3">
            DISCOUNT: ₹{parseFloat(discount.toString()).toFixed(2) || 0}
          </h5>
        </div>
      )}
      <h5 className="text-lg font-semibold mb-3">
        SUBTOTAL : ₹
        {parseFloat(sub_total_discounted_price.toString()).toFixed(2) || 0}
      </h5>
      <p className="text-[#878787] mb-2 text-md">
        Taxes, shipping and discounts codes calculated at checkout
      </p>
      <form onSubmit={onSubmit}>
        <div className="text-[#878787] mb-2 text-md flex gap-2 items-center justify-start md:justify-end">
          <Controller
            name="isChecked"
            control={form.control}
            render={({ field }) => (
              <input
                className="form-check-input rounded-0"
                type="checkbox"
                id="flexCheckChecked"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <label
            htmlFor="flexCheckChecked"
            role="button"
            className="ms-1 work-sans"
          >
            I agree with the terms and conditions.
          </label>
        </div>
        {form.formState.errors.isChecked?.message && (
          <FieldError
            errors={[{ message: form.formState.errors.isChecked?.message }]}
          />
        )}
        <button
          type="submit"
          className={` bg-[#56cfe1] text-white border border-[#56cfe1] px-5 py-2 rounded-full mt-3 w-[170px]  ${
            !form.formState.isValid
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={!form.formState.isValid}
        >
          CHECK OUT
        </button>
      </form>
    </>
  );
}

export default CartCheckout;
