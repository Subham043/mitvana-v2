import HomeBannerSection from "./HomeBannerSection";
import ProductCarouselSection from "./ProductCarouselSection";
import TestimonialSection from "./TestimonialSection";
import JourneySection from "./JourneySection";
import CountriesSection from "./CountriesSection";
import PromiseSection from "./PromiseSection";

function HomePageSection() {
  return (
    <div className="w-full">
      <HomeBannerSection />
      <div className="container mx-auto">
        <ProductCarouselSection title="Skin Care" />
        <ProductCarouselSection title="Body Care" />
        <ProductCarouselSection title="Now Trending" />
        <PromiseSection />
        <ProductCarouselSection title="New Arrivals" />
        <CountriesSection />
        <JourneySection />
        <TestimonialSection />
      </div>
    </div>
  );
}

export default HomePageSection;
