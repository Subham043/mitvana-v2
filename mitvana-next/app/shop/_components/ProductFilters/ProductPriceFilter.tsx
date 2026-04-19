"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { SearchParamType } from "@/lib/types";

function ProductPriceFilter({ params }: { params: SearchParamType }) {
  const router = useRouter();
  const maxPrice = Number(params?.maxPrice || 1000);
  const minPrice = Number(params?.minPrice || 120);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const createPriceURL = useMemo(
    () =>
      debounce((minPrice: number, maxPrice: number) => {
        const newParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (typeof value === "string") {
            newParams.set(key, value);
          }
        });

        newParams.set("page", "1");
        newParams.set("minPrice", minPrice.toString());
        newParams.set("maxPrice", maxPrice.toString());

        router.push(`/shop?${newParams.toString()}`);
      }, 500),
    [params, router],
  );
  return (
    <div className="slider-area w-full mt-3">
      <Slider
        step={5}
        min={120}
        max={1000}
        value={priceRange}
        onValueChange={(value) => {
          const [min, max] = value;
          setPriceRange([min, max]);
          createPriceURL(min, max);
        }}
        className="mx-auto w-full max-w-xs"
      />
      <div className="flex items-center mt-4 py-2 gap-2">
        <span className="text-[#878787] text-sm">Price: </span>
        <span className="text-sm font-semibold">{`₹${priceRange[0].toFixed(2)}`}</span>
        <span>-</span>
        <span className="text-sm font-semibold">{`₹${priceRange[1].toFixed(2)}`}</span>
      </div>
    </div>
  );
}

export default ProductPriceFilter;
