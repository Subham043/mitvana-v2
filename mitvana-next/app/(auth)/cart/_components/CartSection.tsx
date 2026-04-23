"use client";

import { useCartQuery } from "@/lib/data/queries/cart";
import CartProductList from "./CartProductList";
import CartSummary from "./CartSummary";
import { Spinner } from "@/components/ui/spinner";
import EmptySection from "@/components/EmptySection";
import { ShoppingCart } from "lucide-react";

function CartSection() {
  const { data, isLoading } = useCartQuery();
  return (
    <div className="w-full py-10">
      {isLoading ? (
        <div className="text-center w-full flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : data && data.products.length > 0 ? (
        <>
          <CartProductList products={data.products} />
          <CartSummary total_price={data.total_price} />
        </>
      ) : (
        <EmptySection
          title="Your Cart is Empty"
          description="Add products to your cart and get started."
          Icon={ShoppingCart}
        />
      )}
    </div>
  );
}

export default CartSection;
