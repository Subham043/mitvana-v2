import { useFormContext } from "react-hook-form";
import { CheckoutFormValuesType } from "../_lib/useCheckout";
import { FieldError } from "@/components/ui/field";

function CheckoutNote() {
  const { register, formState } = useFormContext<CheckoutFormValuesType>();
  return (
    <div className="mt-5 pt-md-3">
      <h3 className="p-0 mb-0 font-semibold text-2xl border-b pb-3">
        Shipping Details
      </h3>
      <div className="h-1 mb-4 bg-[#56cfe1] w-[134px]"></div>
      <div className="w-full">
        <p className="font-medium text-sm">Order notes (optional)</p>
        <textarea
          className="w-full border border-[#dee2e6] p-2 rounded-lg mt-2"
          id="orderNotes"
          placeholder="Notes about your order e.g. special notes for delivery."
          rows={8}
          {...register("order_note")}
        />
        {formState.errors.order_note && (
          <FieldError
            errors={[{ message: formState.errors.order_note?.message }]}
          />
        )}
      </div>
    </div>
  );
}

export default CheckoutNote;
