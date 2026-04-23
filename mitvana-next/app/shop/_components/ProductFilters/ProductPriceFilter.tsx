"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

function ProductPriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Read from URL safely
  const minFromURL = Number(searchParams.get("minPrice") || 120);
  const maxFromURL = Number(searchParams.get("maxPrice") || 1000);

  // ✅ Local UI state
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minFromURL,
    maxFromURL,
  ]);

  // ✅ Sync UI when URL changes (IMPORTANT)
  useEffect(() => {
    setPriceRange([minFromURL, maxFromURL]);
  }, [minFromURL, maxFromURL]);

  // ✅ Stable debounce
  const updateURL = useMemo(
    () =>
      debounce((min: number, max: number) => {
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("page", "1");
        newParams.set("minPrice", min.toString());
        newParams.set("maxPrice", max.toString());

        router.push(`/shop?${newParams.toString()}`);
      }, 500),
    [searchParams, router],
  );

  // ✅ Cleanup debounce (important)
  useEffect(() => {
    return () => updateURL.cancel();
  }, [updateURL]);

  return (
    <div className="slider-area w-full mt-3">
      <Slider
        step={5}
        min={120}
        max={1000}
        value={priceRange}
        onValueChange={(value) => {
          const [min, max] = value;
          setPriceRange([min, max]); // instant UI update
          updateURL(min, max); // debounced URL update
        }}
        className="md:mx-auto w-full max-w-xs"
      />

      <div className="flex items-center mt-4 py-2 gap-2">
        <span className="text-[#878787] text-sm">Price: </span>
        <span className="text-sm font-semibold">
          ₹{priceRange[0].toFixed(2)}
        </span>
        <span>-</span>
        <span className="text-sm font-semibold">
          ₹{priceRange[1].toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default ProductPriceFilter;
