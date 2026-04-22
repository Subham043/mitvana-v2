import { useAuthStore } from "@/lib/store/auth.store";
import { OrderInfoType } from "@/lib/types";
import { useMemo } from "react";

function OrderBilling({
  order_address,
}: {
  order_address: OrderInfoType["order_address"];
}) {
  const authUser = useAuthStore((state) => state.authUser);
  const name = useMemo(() => {
    if (order_address?.first_name && order_address?.last_name) {
      return order_address.first_name + " " + order_address.last_name;
    }
    return authUser?.name;
  }, [order_address, authUser]);
  const phone = useMemo(() => {
    return order_address?.phone_number || authUser?.phone;
  }, [order_address, authUser]);
  const fullAddress = useMemo(() => {
    //make sure the address should not be , , ,
    const address = [];
    if (order_address?.address) address.push(order_address.address);
    if (order_address?.address_2) address.push(order_address.address_2);
    if (order_address?.city) address.push(order_address.city);
    if (order_address?.state) address.push(order_address.state);
    if (order_address?.country) address.push(order_address.country);
    if (order_address?.postal_code) address.push(order_address.postal_code);
    if (address.length === 0) return "N/A";
    return address.join(", ");
  }, [order_address]);
  return (
    <div className="w-full md:w-[20%] h-fit border border-gray-300 border-dashed rounded p-3 overflow-hidden border-t-[3px] border-t-[#194455] [border-top-style:solid] bg-white">
      <h1 className="text-xl font-semibold mb-4">Billing Address</h1>

      <div className="mb-2 ">
        <p className="text-sm text-[#808B97]">Name:</p>
        <p className="text-lg">{name}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Address:</p>
        <p className="text-lg">{fullAddress}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Phone:</p>
        <p className="text-lg">{phone}</p>
      </div>
      <div className="mb-2">
        <p className="text-sm text-[#808B97]">Email:</p>
        <p className="text-lg">{authUser?.email}</p>
      </div>
    </div>
  );
}

export default OrderBilling;
