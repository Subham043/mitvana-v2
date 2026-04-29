import ImageHeroSection from "@/components/ImageHeroSection";
import WishlistList from "./_components/WishlistList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Wishlist",

  description:
    "Save your favorite Mitvana skincare, haircare, and wellness products to your wishlist and shop them anytime.",

  robots: {
    index: false, // 🔥 CRITICAL
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  alternates: {
    canonical: "https://mitvana.com/wishlist",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/wishlist",
    title: "Your Wishlist – Mitvana",
    description:
      "Keep track of your favorite herbal skincare and wellness products.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Wishlist",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Wishlist",
    description: "Save your favorite products for later.",
  },

  category: "user",
};

export default function WishlistPage() {
  return (
    <div>
      <ImageHeroSection title="Wishlist" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto max-w-[90%] py-5">
        <WishlistList />
      </div>
    </div>
  );
}
