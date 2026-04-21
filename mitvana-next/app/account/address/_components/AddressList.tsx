"use client";

import { Button } from "@/components/ui/button";
import AddressForm from "./AddressForm";
import { Spinner } from "@/components/ui/spinner";
import AddressCard from "./AddressCard";
import { FolderCode } from "lucide-react";
import CustomPagination from "@/components/CustomPagination";
import { useAddressList } from "../_lib/useAddressList";
import EmptySection from "@/components/EmptySection";

function AddressList() {
  const {
    data,
    isLoading,
    modal,
    handleModalClose,
    handleModalOpen,
    handleModalUpdate,
  } = useAddressList();

  return (
    <div className="w-full">
      <div className="py-2 flex flex-row items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#194455]">
            Shipment Address
          </h1>
          <p className="text-sm text-[#194455]">
            The following addresses will be used on the checkout page by
            default.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="rounded-sm bg-[#194455] cursor-pointer"
          onClick={handleModalOpen}
        >
          Add
        </Button>
      </div>
      <div className="w-full flex flex-col gap-5">
        {isLoading ? (
          <div className="text-center w-full flex items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            {data.data.map((item) => (
              <AddressCard
                address={item}
                handleModalUpdate={handleModalUpdate}
                key={item.id}
              />
            ))}
            <CustomPagination totalCount={data.meta.total} />
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
      </div>
      <AddressForm modal={modal} closeModal={handleModalClose} />
    </div>
  );
}

export default AddressList;
