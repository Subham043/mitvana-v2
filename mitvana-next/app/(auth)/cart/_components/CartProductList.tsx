import { CartType } from "@/lib/types";
import CartProductCard from "./CartProductCard";

function CartProductList({ products }: { products: CartType["products"] }) {
  return (
    <>
      <div className="flex border-b pb-2 md:px-4">
        {/* Header Row */}
        <div className="w-1/2 text-sm">PRODUCT</div>
        <div className="w-1/4 text-sm">PRICE</div>
        <div className="w-1/2 md:w-1/4 text-sm">QUANTITY</div>
        <div className="w-1/4 text-sm text-right">TOTAL</div>
      </div>
      {products.map((item) => (
        <CartProductCard key={item.product.id} item={item} />
      ))}
    </>
  );
}

export default CartProductList;
