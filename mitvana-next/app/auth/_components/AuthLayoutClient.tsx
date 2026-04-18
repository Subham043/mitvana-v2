"use client";

import HeroSection from "@/components/HeroSection";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AuthLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/auth/login": "Login",
    "/auth/register": "Register",
    "/auth/forgot-password": "Forgot Password",
    "/auth/reset-password": "Reset Password",
  };

  const title = useMemo(() => {
    return (
      Object.entries(titleMap).find(([key]) => pathname.startsWith(key))?.[1] ??
      "Login"
    );
  }, [pathname]);

  return (
    <>
      <HeroSection title={title} />
      <div className="w-full py-10">
        <div className="container mx-auto max-w-[90%]">{children}</div>
      </div>
    </>
  );
}
