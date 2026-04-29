import type { Metadata } from "next";
import { Inter, Afacad } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-client.provider";
import AuthProvider from "@/providers/auth.provider";
import { getSession } from "@/lib/get-session";
import { CartType } from "@/lib/types";
import { getCart } from "@/lib/get-cart";
import ProductQuickViewProvider from "@/providers/product-quickview.provider";
import VerifyAccount from "@/components/VerifyAccount";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const afacad = Afacad({
  subsets: ["latin"],
  variable: "--font-afacad",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),
  title: {
    default: "Mitvana | The Science of Herbs",
    template: "%s - Mitvana | The Science of Herbs",
  },
  description:
    "Shop Mitvana’s natural skincare, haircare, and wellness products made with herbal ingredients. Toxin-free, dermatologically tested, and inspired by Ayurveda for healthy skin and hair.",
  keywords: [
    "Mitvana",
    "natural skincare India",
    "herbal skincare products",
    "Ayurvedic beauty products",
    "toxin free skincare",
    "organic haircare India",
    "herbal face wash",
    "natural wellness products",
    "chemical free cosmetics India",
  ],
  authors: [{ name: "Mitvana" }],
  creator: "Mitvana",
  publisher: "Mitvana",

  category: "ecommerce",

  alternates: {
    canonical: "https://mitvana.com",
  },

  openGraph: {
    title: "Mitvana – The Science of Herbs",
    description:
      "Explore natural skincare, haircare, and body care products crafted with herbal ingredients and modern science.",
    url: "https://mitvana.com",
    siteName: "Mitvana",
    images: [
      {
        url: "/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Natural Products",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@mitvana",
    creator: "@mitvana",
    title: "Mitvana – Natural Herbal Skincare & Wellness",
    description:
      "Shop toxin-free skincare, haircare, and wellness products powered by nature.",
    images: ["https://mitvana.com/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.jpg",
  },

  appLinks: {
    web: {
      url: "https://mitvana.com",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let cart: CartType | null = null;
  const session = await getSession();

  if (session && session.is_verified) {
    cart = await getCart(session.access_token);
  }

  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, afacad.variable)}
    >
      <body>
        <QueryProvider>
          <AuthProvider session={session} cart={cart}>
            {session && !session.is_verified ? (
              <VerifyAccount />
            ) : (
              <>
                <Header />
                <ProductQuickViewProvider>{children}</ProductQuickViewProvider>
              </>
            )}
            <Footer />
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
