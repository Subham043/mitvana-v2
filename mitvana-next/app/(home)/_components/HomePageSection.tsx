import HomeBannerSection from "./HomeBannerSection";
import TestimonialSection from "./TestimonialSection";
import JourneySection from "./JourneySection";
import CountriesSection from "./CountriesSection";
import PromiseSection from "./PromiseSection";
import ProductCarouselHydrationBoundary from "./ProductCarouselHydrationBoundary";
import {
  skinCareParams,
  hairCareParams,
  onSaleParams,
  trendingParams,
} from "../_lib/search-params.option";

function HomePageSection() {
  return (
    <div className="w-full">
      <HomeBannerSection />
      <div className="container max-w-[90%] mx-auto">
        <ProductCarouselHydrationBoundary
          title="Skin Care"
          params={skinCareParams}
        />
        <ProductCarouselHydrationBoundary
          title="Body Care"
          params={hairCareParams}
        />
        <ProductCarouselHydrationBoundary
          title="Now Trending"
          params={trendingParams}
        />
        <PromiseSection />
        <ProductCarouselHydrationBoundary
          title="New Arrivals"
          params={onSaleParams}
        />
        <CountriesSection />
        <JourneySection />
        <TestimonialSection />
      </div>
    </div>
  );
}

export default HomePageSection;
