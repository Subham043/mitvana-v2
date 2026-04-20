import SearchList from "./SearchList";
import { SearchParamType } from "@/lib/types";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ARRAY_LIST = Array.from({ length: 10 }, (_, index) => index + 1);

function SearchListHydrationBoundary({ params }: { params: SearchParamType }) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ARRAY_LIST.map((item) => (
            <ProductCardSkeleton key={item} />
          ))}
        </div>
      }
    >
      <SearchList params={params} />
    </Suspense>
  );
}

export default SearchListHydrationBoundary;
