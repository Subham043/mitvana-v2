"use client";

import { ProductListType } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart.store";
import { useEffect, useState } from "react";

type Props = {
  stock: ProductListType["stock"];
  id: ProductListType["id"];
  title: ProductListType["title"];
  price: ProductListType["price"];
  discounted_price: ProductListType["discounted_price"];
  thumbnail: ProductListType["thumbnail"];
  thumbnail_link: ProductListType["thumbnail_link"];
  slug: ProductListType["slug"];
};

function ProductCardCartBtn({
  stock,
  id,
  title,
  price,
  discounted_price,
  thumbnail,
  thumbnail_link,
  slug,
}: Props) {
  const item = useCartStore((state) => state.item(id, null));
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    return () => {
      setHydrated(false);
    };
  }, []);

  if (stock < 1) {
    return (
      <button className="hover:bg-sky-700 cursor-pointer z-1 text-gray-50 bg-[#193A43] py-2 transition-all duration-300">
        Notify Me
      </button>
    );
  }

  if (item && hydrated) {
    return (
      <button
        className="hover:bg-sky-700 cursor-pointer z-1 text-gray-50 bg-[#193A43] py-2 transition-all duration-300"
        onClick={() => removeFromCart(id, null)}
      >
        Remove From Cart
      </button>
    );
  }

  return (
    <button
      className="hover:bg-sky-700 cursor-pointer z-1 text-gray-50 bg-[#193A43] py-2 transition-all duration-300"
      onClick={() => {
        addToCart({
          product: {
            id,
            title,
            price,
            discounted_price,
            thumbnail: thumbnail ? thumbnail : undefined,
            thumbnail_link: thumbnail_link ? thumbnail_link : undefined,
            slug,
          },
          quantity: 1,
          total_price_per_product: Number(
            discounted_price ? discounted_price : price,
          ),
          color: null,
        });
      }}
    >
      Add to Cart
    </button>
  );
}

export default ProductCardCartBtn;
