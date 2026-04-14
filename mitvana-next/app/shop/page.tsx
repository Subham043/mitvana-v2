import ImageHeroSection from "@/components/ImageHeroSection";
import ProductFilter from "./_components/ProductFilter";
import ProductListHydrationBoundary from "./_components/ProductListHydrationBoundary";
import ProductPageHeader from "./_components/ProductPageHeader";

export default async function Shop() {
  return (
    <div>
      <ImageHeroSection title="Shop" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto">
        <ProductPageHeader />
        <div className="flex lg:gap-x-10 pb-6 pt-2">
          <div className="lg:flex flex-col items-start w-1/5 border-r-2 pr-3 hidden">
            <ProductFilter />
          </div>
          <div className="mt-3 w-full lg:w-4/5">
            <ProductListHydrationBoundary />
          </div>
        </div>
      </div>
    </div>
  );
}
