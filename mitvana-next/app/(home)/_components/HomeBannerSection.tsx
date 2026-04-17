"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    pic: "/images/home-bags/bg1.png",
    new: "NEW PRODUCT",
    desc1: "Mitvana's Intimate Wash with NEEM AND CHAMOMILE",
    desc2: "",
  },
  {
    id: 2,
    pic: "/images/home-bags/bg2.png",
    new: "NEW PRODUCT",
    desc1: "Mitvana's Vitalizing Hair Oil with Amla and Centella",
    desc2: "",
  },
  {
    id: 3,
    pic: "/images/home-bags/bg3.jpg",
    new: "NEW PRODUCT",
    desc1: "Mitvana's Derma Face Wash with Neem & Turmeric",
    desc2: "",
  },
];

function HomeBannerSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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
    <div className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full relative"
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full cursor-grab">
              <div className="h-[600px] flex items-center justify-center w-full bg-position-center bg-size-cover">
                <Image
                  src={slide.pic}
                  alt=""
                  className="absolute w-full h-full object-cover"
                  width={1920}
                  height={1080}
                />
                <div className="container relative">
                  <div className="flex">
                    <div className="w-full lg:w-1/2">
                      <div className="content">
                        {slide.desc2 ? (
                          <h4 className="text-6xl text-[#193a43] font-semibold mb-3 leading-tight">
                            {slide.desc1} <br />
                            {slide.desc2}
                          </h4>
                        ) : (
                          <h1 className="text-6xl text-[#193a43] font-semibold mb-3 leading-tight">
                            {slide.desc1}
                          </h1>
                        )}
                        <Link
                          className="btn btn-cosmetics border-2 border-[#193a43] bg-white text-[#193a43] px-6 py-3 text-sm font-semibold inline-flex items-center justify-center uppercase tracking-wider hover:bg-[#193a43] hover:text-white transition-all duration-300 ease-in-out"
                          href="/shop"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full border-2 border-[#193a43] transition-all duration-300 ${
                index === current - 1 ? "w-8 bg-[#193a43]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export default HomeBannerSection;
