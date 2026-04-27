import { CartType } from "@/lib/types";
import { useCartCheckout } from "../../_lib/useCartCheckout";
import { FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";

function CartCheckout({
  total_price,
}: {
  total_price: CartType["total_price"];
}) {
  const { form, onSubmit } = useCartCheckout();

  console.log(form.formState.errors);
  return (
    <>
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
