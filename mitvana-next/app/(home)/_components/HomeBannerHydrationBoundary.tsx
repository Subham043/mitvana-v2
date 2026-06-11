import { Suspense } from "react";
import HomeBannerSection from "./HomeBannerSection";
import HomeBannerSkeleton from "./HomeBannerSkeleton";

function HomeBannerHydrationBoundary() {
  return (
    <Suspense fallback={<HomeBannerSkeleton />}>
      <HomeBannerSection />
    </Suspense>
  );
}

export default HomeBannerHydrationBoundary;
