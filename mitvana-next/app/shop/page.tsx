import ImageHeroSection from "@/components/ImageHeroSection";
import ProductFilters from "./_components/ProductFilters";
import ProductPageHeader from "./_components/ProductPageHeader";
import { getQueryClient } from "@/lib/get-query-client";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductListHydrationBoundary from "./_components/ProductListHydrationBoundary";
import { SearchParamType } from "@/lib/types";
import { getSession } from "@/lib/get-session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Shop Natural Skincare, Haircare & Wellness Products",

  description:
    "Shop Mitvana’s range of natural skincare, haircare, and wellness products made with herbal ingredients. Toxin-free, dermatologically tested, and inspired by Ayurveda.",

  keywords: [
    "Mitvana products",
    "natural skincare India",
    "herbal skincare products",
    "Ayurvedic beauty products",
    "organic haircare India",
    "toxin free skincare",
    "buy herbal cosmetics India",
    "natural wellness products",
  ],

  alternates: {
    canonical: "https://mitvana.com/shop",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  // ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/shop",
    title: "Shop Natural Skincare & Wellness Products | Mitvana",
    description:
      "Explore Mitvana’s herbal skincare, haircare, and wellness range crafted with natural ingredients.",
    siteName: "Mitvana",
    locale: "en_IN",

    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Shop Products",
      },
    ],
  },

  // ✅ Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Shop Natural Skincare & Haircare | Mitvana",
    description:
      "Browse and buy herbal skincare, haircare, and wellness products.",
    images: ["https://mitvana.com/logo.jpg"],
  },

  category: "ecommerce",
};

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<SearchParamType>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;

  const session = await getSession();

  void queryClient.prefetchQuery(
    PublishedProductsQueryOptions(
      params as unknown as URLSearchParams,
      session ? session.access_token : undefined,
    ),
  );

  return (
    <div>
      <ImageHeroSection title="Shop" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto max-w-[90%]">
        <ProductPageHeader />
        <div className="flex lg:gap-x-10 pb-6 pt-2">
          <div className="lg:flex flex-col items-start w-1/5 border-r-2 pr-3 hidden sticky top-14 h-fit">
            <ProductFilters />
          </div>
          <div className="mt-3 w-full lg:w-4/5">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProductListHydrationBoundary params={params} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
