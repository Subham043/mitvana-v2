import { ProductListType } from "@/lib/types";

type Props = {
  title: ProductListType["name"];
  price: ProductListType["price"];
  discounted_price: ProductListType["discounted_price"];
};

function ProductCardInfo({ title, price, discounted_price }: Props) {
  return (
    <div className="mt-3">
      <h6 className="mb-1 fw-medium text-center">
        <button className="text-center line-clamp-1 w-full">{title}</button>
      </h6>

      {discounted_price ? (
        <p className="mb-0 text-center">
          <del className="text-[#878787]">
            ₹{parseInt(price.toString()).toFixed(2)}
          </del>{" "}
          <span>₹{parseInt(discounted_price.toString()).toFixed(2)}</span>
        </p>
      ) : (
        <p className="mb-0 text-center">
          ₹{parseInt(price.toString()).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default ProductCardInfo;
