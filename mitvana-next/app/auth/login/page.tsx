import LoginForm from "./_components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Login",

  description:
    "Login to your Mitvana account to manage orders, wishlist, and explore natural skincare and wellness products.",

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
    canonical: "https://mitvana.com/auth/login",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/auth/login",
    title: "Login – Mitvana",
    description: "Access your Mitvana account securely.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Login",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Login",
    description: "Secure login to your account.",
  },

  category: "authentication",
};

export default async function LoginPage() {
  return <LoginForm />;
}
