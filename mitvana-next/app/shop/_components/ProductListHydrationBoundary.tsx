import ProductList from "./ProductList";
import { Suspense } from "react";
import { SearchParamType } from "@/lib/types";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ARRAY_LIST = Array.from({ length: 8 }, (_, index) => index + 1);

function ProductListHydrationBoundary({ params }: { params: SearchParamType }) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ARRAY_LIST.map((item) => (
            <ProductCardSkeleton key={item} />
          ))}
        </div>
      }
    >
      <ProductList params={params} />
    </Suspense>
  );
}

export default ProductListHydrationBoundary;
