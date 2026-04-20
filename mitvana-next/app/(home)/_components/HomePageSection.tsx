import HomeBannerSection from "./HomeBannerSection";
import TestimonialSection from "./TestimonialSection";
import JourneySection from "./JourneySection";
import CountriesSection from "./CountriesSection";
import PromiseSection from "./PromiseSection";
import ProductCarouselHydrationBoundary from "./ProductCarouselHydrationBoundary";

function HomePageSection() {
  const skinCareParams = new URLSearchParams(
    "page=1&limit=8&category_slug=skin-care&sort_by=price&sort_order=asc",
  );
  const hairCareParams = new URLSearchParams(
    "page=1&limit=8&category_slug=hair-care&sort_by=price&sort_order=asc",
  );
  const onSaleParams = new URLSearchParams(
    "page=1&limit=8&tag=On Sale&sort_by=price&sort_order=asc",
  );
  const trendingParams = new URLSearchParams(
    "page=1&limit=8&tag=Trending&sort_by=price&sort_order=asc",
  );
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
