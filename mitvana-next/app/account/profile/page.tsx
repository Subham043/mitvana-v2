import PasswordForm from "./_components/PasswordForm";
import ProfileForm from "./_components/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Profile",

  description: "Manage your account profile and settings",

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
    canonical: "https://mitvana.com/account/profile",
  },

  // Open Graph (optional)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/account/profile",
    title: "Profile – Mitvana",
    description: "Manage your account profile and settings",
    siteName: "Mitvana",
    locale: "en_IN",
    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Profile",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "Mitvana Profile",
    description: "Manage your account profile and settings",
  },

  category: "authentication",
};

export default function Profile() {
  return (
    <>
      <ProfileForm />
      <div className="mt-4">
        <PasswordForm />
      </div>
    </>
  );
}
