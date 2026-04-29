import ImageHeroSection from "@/components/ImageHeroSection";
import CheckoutSection from "./_components/CheckoutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Checkout",

  description:
    "Complete your purchase of herbal skincare, haircare, and wellness products",

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
    url: "https://mitvana.com/checkout",
    title: "Checkout – Mitvana",
    description:
      "Complete your purchase of herbal skincare, haircare, and wellness products",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Checkout",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Checkout",
    description:
      "Complete your purchase of herbal skincare, haircare, and wellness products",
  },

  category: "user",
};

function CheckoutPage() {
  return (
    <div>
      <ImageHeroSection
        title="Checkout"
        image="/images/shopping-cart/shopping-cart-head.jpg"
      />
      <div className="container mx-auto max-w-[90%] py-5">
        <CheckoutSection />
      </div>
    </div>
  );
}

export default CheckoutPage;
