"use client";

import { FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { usePincodeCheckMutation } from "@/lib/data/mutations/pincode";
import {
  PincodeFormValuesType,
  pincodeSchema,
} from "@/lib/data/schemas/pincode";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { MapPinCheck } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

const date = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "short",
    weekday: "long",
  },
);

function ProductItemInfoPincodeSection() {
  const pincodeCheckMutation = usePincodeCheckMutation();

  const form = useForm<PincodeFormValuesType>({
    resolver: yupResolver(pincodeSchema),
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await pincodeCheckMutation.mutateAsync(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
      });
    }),
    [form.handleSubmit, pincodeCheckMutation.mutate],
  );

  const result = useMemo(() => {
    if (pincodeCheckMutation.data) {
      return {
        is_delivery_available: pincodeCheckMutation.data.is_delivery_available,
        delivery_date: date,
        delivery_charge: pincodeCheckMutation.data.shipping_charges,
      };
    }
    return null;
  }, [pincodeCheckMutation.data]);
  return (
    <div className="mt-8 flex flex-col items-start w-full md:w-[60%]">
      <div className="flex flex-col md:flex-row gap-4">
        <span className="text-zinc-500 font-semibold text-sm">Delivery</span>
        <div>
          <form
            onSubmit={onSubmit}
            className="border-b-2 border-solid border-[#193A43] input-icons flex items-center"
          >
            <MapPinCheck size={15} className="text-[#193A43]" />
            <Controller
              name="pincode"
              control={form.control}
              render={({ field }) => (
                <input
                  className="input-field font-semibold text-sm border-none outline-none ml-2 py-1"
                  type="text"
                  placeholder="Enter pincode to check"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    pincodeCheckMutation.reset();
                  }}
                  onBlur={field.onBlur}
                />
              )}
            />
            <button
              type="submit"
              className="text-[#193A43] font-semibold text-sm cursor-pointer ml-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Check"}
            </button>
          </form>
          {form.formState.errors.pincode && (
            <FieldError
              errors={[{ message: form.formState.errors.pincode?.message }]}
            />
          )}
        </div>
      </div>

      {result !== null && (
        <div>
          <div className="mt-2 ml-0 md:ml-[65px]">
            {result.is_delivery_available ? (
              <div className="text-green-600">
                <span className="text-sm font-semibold">
                  Delivery by {result.delivery_date}
                </span>
                <span className="text-[14px] font-medium"> | </span>
                <span className="text-sm font-semibold">
                  ₹{result.delivery_charge}
                </span>
              </div>
            ) : (
              <span className="text-red-600 text-xs font-semibold">
                None of the sellers deliver to this pin code
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItemInfoPincodeSection;
