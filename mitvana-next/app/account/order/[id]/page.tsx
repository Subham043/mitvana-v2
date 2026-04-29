import OrderInfoSection from "./_components/OrderInfoSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Order",

  description: "View your order details",

  robots: {
    index: false, // 🔥 MUST
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  alternates: {
    canonical: "https://mitvana.com/account/order",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/account/order",
    title: "Order – Mitvana",
    description: "View your order details",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Order",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Order",
    description: "View your order details",
  },

  category: "authentication",
};

async function OrderInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="w-full">
      <OrderInfoSection orderId={id} />
    </div>
  );
}

export default OrderInfoPage;
