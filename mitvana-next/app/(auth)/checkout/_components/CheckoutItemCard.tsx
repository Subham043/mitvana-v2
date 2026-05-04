import { useMemo } from "react";

function CheckoutItemCard({
  title,
  quantity,
  stock,
  total_discounted_price_per_product,
}: {
  title: string;
  quantity: number;
  stock: number;
  total_discounted_price_per_product: number;
}) {
  const stockStatus = useMemo(() => {
    if (stock <= 0) {
      return {
        status: "Out of stock",
        textColor: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
      };
    }
    if (quantity > stock) {
      return {
        status: `Only ${stock} left in stock`,
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
      };
    }
    return null;
  }, [stock, quantity]);
  return (
    <div
      className={`flex justify-between font-medium border-b mb-0 p-2 py-3 ${stockStatus ? stockStatus.bgColor : ""}`}
    >
      <h6 className="mb-0 text-sm" style={{ width: "70%" }}>
        <span className="font-normal">{title}</span> x {quantity}
        {stockStatus && (
          <>
            <br />
            <span className={`text-xs font-medium ${stockStatus.textColor}`}>
              {stockStatus.status}
            </span>
          </>
        )}
      </h6>
      <p className="mb-0 text-sm">
        ₹{total_discounted_price_per_product.toFixed(2)}
      </p>
    </div>
  );
}

export default CheckoutItemCard;
