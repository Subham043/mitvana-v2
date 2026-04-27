function CheckoutBillingCard({
  item,
  isSelected,
}: {
  item: any;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex items-start cursor-pointer border p-3 rounded mt-3 gap-3 ${isSelected ? "bg-blue-100" : ""}`}
    >
      <input
        type="radio"
        name="address"
        // checked={isSelected}
        className="mt-1"
      />

      <div className="w-full">
        {isSelected && (
          <p className="m-0 text-blue-600 text-sm">Delivering to</p>
        )}

        <div className="flex justify-between items-center">
          <p className="text-md m-0">
            {item?.firstName + " " + item?.lastName} | {item?.addressType}
          </p>
          <button className="border-[#194455] border-b-2 py-1 me-2">
            Edit
          </button>
        </div>

        <p className="text-sm m-0">
          {item?.address}, {item?.address2 ? item?.address2 + "," : ""}
          {item?.city}, {item?.state}, {item?.country} -{item?.postalCode}
        </p>
        <p className="text-sm m-0">Mob: {item?.phoneNumber}</p>
      </div>
    </div>
  );
}

export default CheckoutBillingCard;
