import { Button } from "@/components/ui/button";
import ProductFilterDrawer from "./ProductFilters/ProductFilterDrawer";
import ProductSortFilter from "./ProductFilters/ProductSortFilter";
import Link from "next/link";

function ProductPageHeader() {
  return (
    <div className=" mt-5 py-2 flex justify-between items-center sticky top-0 z-10 bg-white">
      <ProductFilterDrawer />

      <div className="flex justify-center items-center gap-2">
        <ProductSortFilter />
        <Button variant="secondary" asChild>
          <Link href="/shop">Clear Filter</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductPageHeader;
