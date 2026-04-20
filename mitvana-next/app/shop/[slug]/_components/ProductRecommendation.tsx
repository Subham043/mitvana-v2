"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductType } from "@/lib/types";
import { Flower } from "lucide-react";

function ProductRecommendation({
  related_products,
}: {
  related_products: ProductType["related_products"];
}) {
  if (related_products.length === 0) return null;
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
          {related_products.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-1"
            >
              <ProductCard
                key={item.id}
                thumbnail={item.thumbnail}
                thumbnail_link={
                  item.thumbnail_link ? item.thumbnail_link : undefined
                }
                product_images={item.product_images}
                slug={item.slug}
                title={item.title}
                name={item.title}
                stock={item.stock}
                tags={item.tags}
                price={item.price}
                discounted_price={
                  item.discounted_price ? item.discounted_price : 0
                }
              />
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
