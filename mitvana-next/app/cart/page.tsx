import ImageHeroSection from "@/components/ImageHeroSection";
import CartSection from "./_components/CartSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Shopping Cart",

  description:
    "Review the items in your cart and proceed to checkout securely with Mitvana’s natural skincare, haircare, and wellness products.",

  robots: {
    index: false, // 🔥 CRITICAL
    follow: false, // optional but recommended
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  alternates: {
    canonical: "https://mitvana.com/cart",
  },

  // Open Graph (not very important, but okay)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/cart",
    title: "Your Cart – Mitvana",
    description: "View your selected Mitvana products and proceed to checkout.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Shopping Cart",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Cart",
    description: "Review your cart and checkout securely.",
  },

  category: "checkout",
};

export default function CartPage() {
  return (
    <div>
      <ImageHeroSection
        title="Cart"
        image="/images/shopping-cart/shopping-cart-head.jpg"
      />
      <div className="container mx-auto max-w-[90%] py-5">
        <CartSection />
      </div>
    </div>
  );
}
