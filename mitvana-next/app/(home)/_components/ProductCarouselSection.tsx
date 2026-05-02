"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Flower } from "lucide-react";

function ProductCarouselSection({
  title,
  params,
}: {
  title: string;
  params: URLSearchParams;
}) {
  const { data } = useSuspenseQuery(PublishedProductsQueryOptions(params));
  return (
    <div className="mt-12 mb-12 lg:mt-24 lg:mb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-2">{title}</h1>
        <span className="flex items-center justify-center gap-2">
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
          <Flower className="w-5 h-5 text-[#878787]" />
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
        </span>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {data.data.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard
                key={item.id}
                id={item.id}
                thumbnail={item.thumbnail}
                thumbnail_link={item.thumbnail_link}
                product_images={item.product_images}
                slug={item.slug}
                title={item.title}
                name={item.name}
                stock={item.stock}
                tags={item.tags}
                price={item.price}
                discounted_price={item.discounted_price}
                hsn={item.hsn}
                sku={item.sku}
                is_in_wishlist={item.is_in_wishlist}
                tax={item.tax}
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

export default ProductCarouselSection;
