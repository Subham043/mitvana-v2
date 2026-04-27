import { Button } from "@/components/ui/button";
import CheckoutBillingCard from "./CheckoutBillingCard";

const userAddress = [
  {
    address: "test address123",
    address2: "",
    city: "Bengaluru",
    state: "Karnataka",
    phoneNumber: "7892156160",
    firstName: "subham",
    lastName: "saha",
    postalCode: "560076",
    addressType: "Home",
    country: "india",
    _id: "69e07d6e21f94566746ca330",
  },
];

function CheckoutBilling() {
  return (
    <div className="w-full">
      <div className="flex justify-between border-b pb-3 items-center">
        <h3 className="p-0 mb-0 font-semibold text-2xl">Billing details</h3>
        <Button className="hover:bg-sky-700 cursor-pointer z-99 text-gray-50 bg-[#193A43] py-2">
          Add Address
        </Button>
      </div>
      <div className="h-1 mb-4 bg-[#56cfe1] w-[134px]"></div>
      <div>
        {userAddress?.length > 0 &&
          userAddress.map((item, index) => {
            const isSelected = true;

            return (
              <CheckoutBillingCard
                key={item?._id}
                item={item}
                isSelected={isSelected}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CheckoutBilling;
