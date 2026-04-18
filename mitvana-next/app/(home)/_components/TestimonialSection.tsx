"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const happycustomer = [
  {
    id: 1,
    avatar: "/images/home-bags/SUNIL.jpeg",
    name: "SUNIL KUMAR",
    review:
      "These skincare products transformed my daily routine. My skin feels so much healthier!",
  },
  {
    id: 2,
    avatar: "/images/home-bags/PALLAVI.jpeg",
    name: "PALLAVI UMESH",
    review:
      "Fantastic quality and results! I noticed a huge improvement in just a week.",
  },
  {
    id: 3,
    avatar: "/images/home-bags/ARSH.jpeg",
    name: "ARSALAN SHAIKH",
    review:
      "Finally found a brand that cares about natural ingredients and real results.",
  },
  {
    id: 4,
    avatar: "/images/home-bags/hat.jpeg",
    name: "JATIN DIXIT",
    review:
      "Impressed by the fast delivery and excellent customer support. Highly recommended!",
  },
  {
    id: 5,
    avatar: "/images/home-bags/mom.jpeg",
    name: "Naumanali shaikh",
    review:
      "As a healthcare professional, I trust and endorse these products for my patients.",
  },
];

function TestimonialSection() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="mt-12 lg:mt-24 mb-12 lg:mb-24">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-3">
          Happy Customers
        </h1>
        <span className="text-lg tracking-wider text-[#5c808a]">
          What Folks Are Saying About Us
        </span>
      </div>
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {happycustomer.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="bg-[#f6f6f8] border mx-3 p-5">
                <p className="text-black text-md">{item.review}</p>
                <div className="flex items-center gap-3 mt-4 pt-2">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-full w-18 h-18"
                  />
                  <div>
                    <h6 className="font-semibold mb-0 uppercase">
                      {item.name}
                    </h6>
                    <div className="text-yellow-500 flex gap-1">
                      <Star className="fill-yellow-500 h-3 w-3" />
                      <Star className="fill-yellow-500 h-3 w-3" />
                      <Star className="fill-yellow-500 h-3 w-3" />
                      <Star className="fill-yellow-500 h-3 w-3" />
                      <Star className="fill-yellow-500 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default TestimonialSection;
