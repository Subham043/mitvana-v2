"use client";
import { useCartNewQuery } from "@/lib/data/queries/cart";
import CheckoutBilling from "./CheckoutBilling";
import CheckoutNote from "./CheckoutNote";
import CheckoutSummary from "./CheckoutSummary";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ShoppingCart } from "lucide-react";
import EmptySection from "@/components/EmptySection";

function CheckoutSection() {
  const [isHydarated, setIsHydarated] = useState(false);
  useEffect(() => {
    setIsHydarated(true);
    return () => {
      setIsHydarated(false);
    };
  }, []);
  const { data, isLoading } = useCartNewQuery(isHydarated);

  if (isLoading) {
    return (
      <div className="w-full my-5">
        <div className="text-center w-full flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      </div>
    );
  }

  if (!data || data.products.length === 0) {
    return (
      <div className="w-full my-5">
        <EmptySection
          title="Your Cart is Empty"
          description="Add products to your cart and get started."
          Icon={ShoppingCart}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 my-5">
      <div className="w-full md:w-2/3">
        <CheckoutBilling />
        <CheckoutNote />
      </div>
      <div className="w-full md:w-1/3">
        <CheckoutSummary data={data} />
      </div>
    </div>
  );
}

export default CheckoutSection;
