import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Forgot Password",

  description:
    "Reset your Mitvana account password securely and regain access to your account.",

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
    canonical: "https://mitvana.com/auth/forgot-password",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/auth/forgot-password",
    title: "Forgot Password – Mitvana",
    description:
      "Reset your Mitvana account password securely and regain access to your account.",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Forgot Password",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Forgot Password",
    description:
      "Reset your Mitvana account password securely and regain access to your account.",
  },

  category: "authentication",
};

export default async function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
