"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductListType } from "@/lib/types";
import { Flower } from "lucide-react";

function ProductRecommendation({
  relatedProducts,
}: {
  relatedProducts: ProductListType[];
}) {
  if (relatedProducts.length === 0) return null;
  return (
    <div className=" mt-10 mb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-2">
          You May Also Like
        </h1>
        <span className="flex items-center justify-center gap-2">
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
          <Flower className="w-5 h-5 text-[#878787]" />
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
        </span>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {relatedProducts.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-1"
            >
              <ProductCard product={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5 md:-left-12" />
        <CarouselNext className="-right-5 md:-right-12" />
      </Carousel>
    </div>
  );
}

export default ProductRecommendation;
