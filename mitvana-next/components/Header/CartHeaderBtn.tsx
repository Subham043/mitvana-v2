"use client";

import { useCartStore } from "@/lib/store/cart.store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function CartHeaderBtn() {
  const count = useCartStore((state) => state.cartProducts().length);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    return () => setHydrated(false);
  }, []);

  return (
    <Link href="/cart" className="relative text-black cursor-pointer">
      <ShoppingCart />
      {count > 0 && hydrated && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 p-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

export default CartHeaderBtn;
