import ResetPasswordForm from "./_components/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Reset Password",

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
    canonical: "https://mitvana.com/auth/reset-password",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/auth/reset-password",
    title: "Reset Password – Mitvana",
    description: "Securely reset your password",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Reset Password",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Reset Password",
    description:
      "Reset your Mitvana account password securely and regain access to your account.",
  },

  category: "authentication",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
