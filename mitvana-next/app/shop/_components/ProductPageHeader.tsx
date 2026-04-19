import { Button } from "@/components/ui/button";
import ProductFilterDrawer from "./ProductFilters/ProductFilterDrawer";
import ProductSortFilter from "./ProductFilters/ProductSortFilter";
import Link from "next/link";
import { SearchParamType } from "@/lib/types";

function ProductPageHeader({ params }: { params: SearchParamType }) {
  return (
    <div className=" mt-5 flex justify-between items-center">
      <ProductFilterDrawer params={params} />

      <div className="flex justify-center items-center gap-2">
        <ProductSortFilter params={params} />
        <Button variant="secondary" asChild>
          <Link href="/shop">Clear Filter</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductPageHeader;
