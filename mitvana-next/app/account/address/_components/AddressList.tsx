"use client";

import { Button } from "@/components/ui/button";
import { ExtendedModalProps } from "@/lib/types";
import { useCallback, useState } from "react";
import AddressForm from "./AddressForm";
import { useAddressesQuery } from "@/lib/data/queries/address";
import { Spinner } from "@/components/ui/spinner";
import AddressCard from "./AddressCard";

function AddressList() {
  const { data, isLoading } = useAddressesQuery();

  const [modal, setModal] = useState<ExtendedModalProps<{ id: string }>>({
    show: false,
    type: "create",
  });

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: "create" }),
    [],
  );

  const handleModalOpen = useCallback(() => {
    setModal({ show: true, type: "create" });
  }, []);

  const handleModalUpdate = useCallback((id: string) => {
    setModal({ show: true, type: "update", id });
  }, []);

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
          data.data.map((item) => (
            <AddressCard
              address={item}
              handleModalUpdate={handleModalUpdate}
              key={item.id}
            />
          ))
        ) : (
          <div className="text-center w-full flex items-center justify-center">
            <p className="text-sm text-[#194455] italic">No addresses found.</p>
          </div>
        )}
      </div>
      <AddressForm modal={modal} closeModal={handleModalClose} />
    </div>
  );
}

export default AddressList;
