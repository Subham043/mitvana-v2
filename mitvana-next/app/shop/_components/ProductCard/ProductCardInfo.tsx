import { ProductListType } from "@/lib/types";
import Link from "next/link";

type Props = {
  title: ProductListType["name"];
  price: ProductListType["price"];
  discounted_price: ProductListType["discounted_price"];
  slug: ProductListType["slug"];
};

function ProductCardInfo({ title, price, discounted_price, slug }: Props) {
  return (
    <div className="mt-3">
      <h6 className="mb-1 fw-medium text-center">
        <Link
          href={`/shop/${slug}`}
          className="text-center line-clamp-1 w-full"
        >
          {title}
        </Link>
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
