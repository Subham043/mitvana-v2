import AddressList from "./_components/AddressList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Address",

  description: "Manage your saved addresses for faster checkout",

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
    canonical: "https://mitvana.com/account/address",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/account/address",
    title: "Address – Mitvana",
    description: "Manage your saved addresses for faster checkout",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Address",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Address",
    description: "Manage your saved addresses for faster checkout",
  },

  category: "authentication",
};

export default async function Address() {
  return <AddressList />;
}
