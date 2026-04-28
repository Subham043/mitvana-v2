"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth.store";

function WishlistHeaderBtn() {
  const authToken = useAuthStore((state) => state.authToken);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    return () => setHydrated(false);
  }, []);

  if (authToken && hydrated) {
    return (
      <Link
        href={authToken && hydrated ? "/wishlist" : "/auth/login"}
        className="relative text-black cursor-pointer"
      >
        <Heart />
      </Link>
    );
  }

  return null;
}

export default WishlistHeaderBtn;
