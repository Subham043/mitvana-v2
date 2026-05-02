"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAddressDeleteMutation } from "@/lib/data/mutations/address";
import { AddressType } from "@/lib/types";
import { Pencil, Trash } from "lucide-react";

type Props = {
  address: AddressType;
  handleModalUpdate: (id: string) => void;
};

function AddressCard({ address, handleModalUpdate }: Props) {
  const deleteAddressMutation = useAddressDeleteMutation(address.id);
  return (
    <Card className="w-full rounded-sm shadow-none p-0 gap-0">
      <CardHeader className="py-2 px-2 md:px-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-md text-[#194455] capitalize">
            {address.first_name} {address.last_name} | {address.address_type}
          </CardTitle>
          <CardDescription>
            {address.address},{" "}
            {address.address_2 ? `${address.address_2}, ` : null}
            {address.city}, {address.state}, {address.country} -{" "}
            {address.postal_code}
          </CardDescription>
          <CardDescription>Mob: {address.phone_number}</CardDescription>
        </div>
        <CardAction className="flex gap-1">
          <Button
            variant="default"
            type="submit"
            size="xs"
            className="rounded-sm cursor-pointer"
            onClick={() => handleModalUpdate(address.id)}
          >
            <Pencil />
          </Button>
          <Button
            variant="destructive"
            type="submit"
            size="xs"
            className="rounded-sm cursor-pointer"
            onClick={() => deleteAddressMutation.mutateAsync()}
            disabled={deleteAddressMutation.isPending}
          >
            {deleteAddressMutation.isPending ? <Spinner /> : <Trash />}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export default AddressCard;
