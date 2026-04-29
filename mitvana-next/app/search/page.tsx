import { SearchParamType } from "@/lib/types";
import SearchListHydrationBoundary from "./_components/SearchListHydrationBoundary";
import { getQueryClient } from "@/lib/get-query-client";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSession } from "@/lib/get-session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Search Products",

  description:
    "Search and explore Mitvana’s natural skincare, haircare, and wellness products tailored to your needs.",

  robots: {
    index: false, // 🔥 IMPORTANT
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },

  alternates: {
    canonical: "https://mitvana.com/search",
  },

  // Open Graph (optional but fine)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/search",
    title: "Search Mitvana Products",
    description:
      "Find natural skincare, haircare and wellness products from Mitvana.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Search Mitvana Products",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Search Mitvana Products",
    description:
      "Explore Mitvana’s range of herbal skincare and wellness products.",
    images: ["https://mitvana.com/logo.jpg"],
  },

  category: "search",
};

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<SearchParamType>;
}) {
  const session = await getSession();

  const queryClient = getQueryClient();
  const params = await searchParams;

  if (params.search && params.search.length > 0) {
    void queryClient.prefetchQuery(
      PublishedProductsQueryOptions(
        params as unknown as URLSearchParams,
        session ? session.access_token : undefined,
      ),
    );
  }

  return (
    <div>
      <div className="container mx-auto max-w-[90%] py-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchListHydrationBoundary params={params} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
