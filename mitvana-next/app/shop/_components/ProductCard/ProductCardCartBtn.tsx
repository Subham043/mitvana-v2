"use client";

import { ProductListType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useCartProductQuery } from "@/lib/data/queries/cart";
import {
  useAddCartMutation,
  useRemoveCartMutation,
} from "@/lib/data/mutations/cart";

type Props = {
  stock: ProductListType["stock"];
  id: ProductListType["id"];
  title: ProductListType["title"];
  price: ProductListType["price"];
  discounted_price: ProductListType["discounted_price"];
  thumbnail: ProductListType["thumbnail"];
  thumbnail_link: ProductListType["thumbnail_link"];
  slug: ProductListType["slug"];
  hsn: ProductListType["hsn"];
  sku: ProductListType["sku"];
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
  hsn,
  sku,
}: Props) {
  const { data: item } = useCartProductQuery(id);
  const addToCartMutation = useAddCartMutation();
  const removeFromCartMutation = useRemoveCartMutation();
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
        onClick={() => removeFromCartMutation.mutateAsync({ productId: id })}
      >
        Remove From Cart
      </button>
    );
  }

  return (
    <button
      className="hover:bg-sky-700 cursor-pointer z-1 text-gray-50 bg-[#193A43] py-2 transition-all duration-300"
      onClick={() => {
        addToCartMutation.mutateAsync({
          product: {
            id,
            title,
            price,
            discounted_price,
            thumbnail: thumbnail ? thumbnail : undefined,
            thumbnail_link: thumbnail_link ? thumbnail_link : undefined,
            slug,
            stock,
            hsn,
            sku,
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
