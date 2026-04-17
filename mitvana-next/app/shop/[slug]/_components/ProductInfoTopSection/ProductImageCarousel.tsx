"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  "public/uploads/images-ACNE-PIMPLE-GEL-03.jpg",
  "public/uploads/images-ACNE-PIMPLE-GEL-04.jpg",
  "public/uploads/images-ACNE-PIMPLE-GEL-05.jpg",
  "public/uploads/images-ACNE-PIMPLE-GEL-06.jpg",
  "public/uploads/images-ACNE-PIMPLE-GEL-02.jpg",
];

function ProductImageCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex-1">
      <div className="flex gap-6">
        <div className="w-fit flex flex-col gap-2">
          {slides.map((slide, index) => (
            <Image
              key={index}
              src={`https://api.mitvana.com/${slide}`}
              alt=""
              className={`w-[150px] h-[150px] object-cover cursor-pointer ease-in-out transition-all duration-300 ${index === current - 1 ? "border-2 border-[#193a43]" : ""}`}
              width={150}
              height={150}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
        <div className="flex-1">
          <Carousel setApi={setApi} className="w-full relative">
            <CarouselContent className="h-full">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="h-full cursor-grab">
                  <Image
                    src={`https://api.mitvana.com/${slide}`}
                    alt=""
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 cursor-pointer" />
            <CarouselNext className="right-5 cursor-pointer" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 cursor-pointer rounded-full border-2 border-[#193a43] transition-all duration-300 ${
                    index === current - 1
                      ? "w-8 bg-[#193a43]"
                      : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ProductImageCarousel;
