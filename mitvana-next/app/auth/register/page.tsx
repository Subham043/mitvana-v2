import RegisterForm from "./_components/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Create Account",

  description:
    "Create your Mitvana account to track orders, manage wishlist, and explore natural skincare, haircare, and wellness products.",

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
    canonical: "https://mitvana.com/auth/register",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/auth/register",
    title: "Sign Up – Mitvana",
    description:
      "Create your Mitvana account and start your natural wellness journey.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Sign Up",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Sign Up",
    description: "Create your account in seconds.",
  },

  category: "authentication",
};

export default async function RegisterPage() {
  return <RegisterForm />;
}
