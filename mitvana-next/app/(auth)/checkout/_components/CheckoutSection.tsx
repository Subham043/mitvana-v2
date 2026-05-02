"use client";
import { useCartNewQuery } from "@/lib/data/queries/cart";
import CheckoutBilling from "./CheckoutBilling";
import CheckoutNote from "./CheckoutNote";
import CheckoutSummary from "./CheckoutSummary";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ShoppingCart } from "lucide-react";
import EmptySection from "@/components/EmptySection";
import { useCheckout } from "../_lib/useCheckout";
import { FormProvider } from "react-hook-form";
import { PlaceOrderFormValuesType } from "@/lib/data/schemas/order";

function CheckoutSection() {
  const [isHydarated, setIsHydarated] = useState(false);
  useEffect(() => {
    setIsHydarated(true);
    return () => {
      setIsHydarated(false);
    };
  }, []);
  const { data, isLoading } = useCartNewQuery(isHydarated);
  const { form, onSubmit } = useCheckout();

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
    <FormProvider<PlaceOrderFormValuesType> {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col md:flex-row justify-between gap-5 my-5">
          <div className="w-full md:w-2/3">
            <CheckoutBilling selectedAddress={data.address} />
            <CheckoutNote />
          </div>
          <div className="w-full md:w-1/3">
            <CheckoutSummary data={data} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default CheckoutSection;
