import { Button } from "@/components/ui/button";
import CheckoutBillingCard from "./CheckoutBillingCard";
import { useAddressList } from "@/app/account/address/_lib/useAddressList";
import { Spinner } from "@/components/ui/spinner";
import CustomPagination from "@/components/CustomPagination";
import EmptySection from "@/components/EmptySection";
import { FolderCode } from "lucide-react";
import AddressForm from "@/app/account/address/_components/AddressForm";
import { CartType } from "@/lib/types";
import { useFormContext, useFormState } from "react-hook-form";
import { CheckoutFormValuesType } from "../../_lib/useCheckout";
import { FieldError } from "@/components/ui/field";

function CheckoutBilling({
  selectedAddress,
}: {
  selectedAddress: CartType["address"];
}) {
  const {
    data,
    isLoading,
    modal,
    handleModalClose,
    handleModalOpen,
    handleModalUpdate,
  } = useAddressList();
  const { control } = useFormContext<CheckoutFormValuesType>();

  const { errors } = useFormState({
    control,
  });
  return (
    <div className="w-full">
      <div className="flex justify-between border-b pb-3 items-center">
        <div className="flex-1">
          <h3 className="p-0 mb-0 font-semibold text-2xl">Billing details</h3>
          {errors.address_id?.message && (
            <FieldError errors={[{ message: errors.address_id?.message }]} />
          )}
        </div>
        <Button
          className="hover:bg-sky-700 cursor-pointer text-gray-50 bg-[#193A43] py-2"
          onClick={handleModalOpen}
          type="button"
        >
          Add Address
        </Button>
      </div>
      <div className="h-1 mb-4 bg-[#56cfe1] w-[134px]"></div>
      {isLoading ? (
        <div className="text-center w-full flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : data && data.data.length > 0 ? (
        <>
          {data.data.map((item) => (
            <CheckoutBillingCard
              address={item}
              handleModalUpdate={handleModalUpdate}
              key={item.id}
              selectedAddress={selectedAddress}
            />
          ))}
          <div className="mt-3">
            <CustomPagination totalCount={data.meta.total} />
          </div>
        </>
      ) : (
        <EmptySection
          title="No Address Yet"
          description="You haven't created any address yet. Get started by creating your first address."
          Icon={FolderCode}
          containBtn
          onClick={handleModalOpen}
          btnText="Create Address"
        />
      )}
      <AddressForm modal={modal} closeModal={handleModalClose} />
    </div>
  );
}

export default CheckoutBilling;
