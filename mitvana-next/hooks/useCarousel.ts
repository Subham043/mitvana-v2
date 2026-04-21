import { CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

export const useCarousel = () => {

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

    return {
        api,
        current,
        count,
        plugin,
        setApi,
    }

}