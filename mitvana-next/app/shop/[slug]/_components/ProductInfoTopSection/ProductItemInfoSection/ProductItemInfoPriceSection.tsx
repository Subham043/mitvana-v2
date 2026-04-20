import { ProductType } from "@/lib/types";

type Props = {
  discounted_price: ProductType["discounted_price"];
  price: ProductType["price"];
  saved_price: ProductType["saved_price"];
  saved_percentage: ProductType["saved_percentage"];
};

function ProductItemInfoPriceSection({
  discounted_price,
  price,
  saved_price,
  saved_percentage,
}: Props) {
  return (
    <div className="flex mt-3 flex-wrap justify-between gap-4">
      <div>
        {discounted_price ? (
          <div className="space-y-2">
            <p className="text-xs mb-2 font-semibold text-zinc-600">
              <span className="line-through">
                MRP: ₹{parseInt(price.toString()).toFixed(2)}
              </span>
            </p>
            <p className="text-2xl">
              ₹{parseInt(discounted_price.toString()).toFixed(2)}
            </p>
            <p className="text-sm text-green-600">
              You saved ₹{parseInt(saved_price.toString()).toFixed(2)} (
              {parseInt(saved_percentage.toString()).toFixed(2)}
              %)
            </p>

            <p className="text-xs">Inclusive of all taxes</p>
          </div>
        ) : (
          <p className="text-2xl mb-4">
            MRP: ₹{parseInt(price.toString()).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductItemInfoPriceSection;
