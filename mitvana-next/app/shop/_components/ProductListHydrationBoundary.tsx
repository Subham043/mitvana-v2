import { Spinner } from "@/components/ui/spinner";
import ProductList from "./ProductList";
import { Suspense } from "react";
import { SearchParamType } from "@/lib/types";

function ProductListHydrationBoundary({ params }: { params: SearchParamType }) {
  return (
    <Suspense
      fallback={
        <div className="text-center w-full flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      }
    >
      <ProductList params={params} />
    </Suspense>
  );
}

export default ProductListHydrationBoundary;
