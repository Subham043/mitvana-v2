import { MapPinCheck } from "lucide-react";

function ProductItemInfoPincodeSection() {
  return (
    <div className="mt-8 flex flex-col items-start w-full md:w-[60%]">
      <div className="flex flex-col md:flex-row gap-4">
        <span className="text-zinc-500 font-semibold text-sm">Delivery</span>
        <div className="border-b-2 border-solid border-[#193A43] input-icons flex items-center">
          <MapPinCheck size={15} className="text-[#193A43]" />
          <input
            className="input-field font-semibold text-sm border-none outline-none ml-2 py-1"
            type="text"
            placeholder="Enter pincode to check"
          />
          <span className="text-[#193A43] font-semibold text-sm cursor-pointer ml-2">
            Check
          </span>
        </div>
      </div>

      <div>
        <div className="mt-2 ml-0 md:ml-[65px]">
          <div className="text-green-600">
            <span className="text-sm font-semibold">
              Delivery by{" "}
              {new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000,
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                weekday: "long",
              })}
            </span>
            <span className="text-[14px] font-medium"> | </span>
            <span className="text-sm font-semibold">₹40</span>
          </div>
          {/* <span className="text-red-600 text-xs font-semibold">
                          None of the sellers deliver to this pin code
                        </span> */}
        </div>
      </div>
    </div>
  );
}

export default ProductItemInfoPincodeSection;
