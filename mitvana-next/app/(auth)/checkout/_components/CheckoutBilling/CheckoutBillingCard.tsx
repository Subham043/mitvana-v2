import { Spinner } from "@/components/ui/spinner";
import { useAddressDeleteMutation } from "@/lib/data/mutations/address";
import { useSelectAddressMutation } from "@/lib/data/mutations/cart";
import { AddressType, CartType } from "@/lib/types";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValuesType } from "../../_lib/useCheckout";

function CheckoutBillingCard({
  address,
  handleModalUpdate,
  selectedAddress,
}: {
  address: AddressType;
  handleModalUpdate: (id: string) => void;
  selectedAddress: CartType["address"];
}) {
  const deleteAddressMutation = useAddressDeleteMutation(address.id);
  const selectAddressMutation = useSelectAddressMutation();
  const { setValue } = useFormContext<CheckoutFormValuesType>();

  const isSelected = selectedAddress?.id === address.id;

  const debouncedSelectAddress = useMemo(
    () =>
      debounce(() => {
        selectAddressMutation.mutate({ address_id: address.id });
        setValue("address_id", address.id, { shouldValidate: true });
      }, 500),
    [selectAddressMutation, address.id, setValue],
  );

  const handleSelectAddress = useCallback(() => {
    debouncedSelectAddress();
  }, [debouncedSelectAddress]);

  // cleanup to avoid memory leaks / stale calls
  useEffect(() => {
    return () => {
      debouncedSelectAddress.cancel();
    };
  }, [debouncedSelectAddress]);

  return (
    <div
      className={`flex items-start cursor-pointer border p-3 rounded mt-3 gap-3 ${isSelected ? "bg-blue-100" : "hover:bg-muted/50"}`}
      onClick={handleSelectAddress}
    >
      <div className="w-full">
        {isSelected && (
          <p className="m-0 text-blue-600 text-sm">Delivering to</p>
        )}

        <div className="flex justify-between items-start gap-2">
          {selectAddressMutation.isPending ? (
            <Spinner className="size-3 text-gray-500 mx-auto mt-2" />
          ) : (
            <input
              type="radio"
              name="address"
              className="mt-2 cursor-pointer"
              checked={isSelected}
              onChange={handleSelectAddress}
            />
          )}

          <div className="flex-1">
            <p className="text-md m-0">
              {address.first_name + " " + address.last_name} |{" "}
              {address.address_type}
            </p>
            <p className="text-sm m-0">
              {address.address},{" "}
              {address.address_2 ? address.address_2 + "," : ""}
              {address.city}, {address.state}, {address.country} -
              {address.postal_code}
            </p>
            <p className="text-sm m-0">Mob: {address.phone_number}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="border-[#194455] border-b-2 py-0.5 px-1 transition-all duration-300 ease-in-out hover:text-[#194455] hover:bg-[#194455]/10 hover:rounded-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleModalUpdate(address.id);
              }}
              type="button"
            >
              Edit
            </button>
            <button
              className={`border-[#ff0000] border-b-2 py-0.5 px-1 transition-all duration-300 ease-in-out hover:text-[#ff0000] hover:bg-[#ff0000]/10 hover:rounded-sm ${
                deleteAddressMutation.isPending
                  ? "opacity-50 cursor-not-allowed border-none"
                  : "cursor-pointer"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                deleteAddressMutation.mutate();
              }}
              type="button"
            >
              {deleteAddressMutation.isPending ? (
                <Spinner className="size-6 text-red-500 mx-auto" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutBillingCard;
