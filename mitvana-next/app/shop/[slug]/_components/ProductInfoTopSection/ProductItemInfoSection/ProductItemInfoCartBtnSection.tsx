import { Button } from "@/components/ui/button";
import {
  useAddCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@/lib/data/mutations/cart";
import { useCartProductQuery } from "@/lib/data/queries/cart";
import { ProductType } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  stock: ProductType["stock"];
  id: ProductType["id"];
  title: ProductType["title"];
  price: ProductType["price"];
  discounted_price: ProductType["discounted_price"];
  thumbnail: ProductType["thumbnail"];
  thumbnail_link: ProductType["thumbnail_link"];
  slug: ProductType["slug"];
  hsn: ProductType["hsn"];
  sku: ProductType["sku"];
};

function ProductItemInfoCartBtnSection({
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
  const updateCartMutation = useUpdateCartMutation();
  const removeFromCartMutation = useRemoveCartMutation();
  const addToCartMutation = useAddCartMutation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    return () => {
      setHydrated(false);
    };
  }, []);

  if (stock < 1) {
    return (
      <Button
        variant="default"
        className="bg-[#56cfe1] text-white border border-[#56cfe1] w-[170px] uppercase p-4 py-5 rounded-full cursor-pointer"
      >
        Notify Me
      </Button>
    );
  }
  if (item && hydrated) {
    return (
      <>
        <div className="inline-flex p-4 h-10 border rounded-full items-center justify-between">
          <button
            className="text-lg cursor-pointer hover:cursor-pointer hover:text-red-500"
            onClick={() =>
              updateCartMutation.mutateAsync({
                productId: id,
                quantity: Math.max(item.quantity - 1, 1),
                stock,
              })
            }
          >
            −
          </button>
          <input
            type="text"
            readOnly
            value={item ? item.quantity : 1}
            className="w-20 text-center border-none outline-none"
          />
          <button
            className="text-lg cursor-pointer hover:cursor-pointer hover:text-green-500"
            onClick={() =>
              updateCartMutation.mutateAsync({
                productId: id,
                quantity: Math.min(item.quantity + 1, stock),
                stock,
              })
            }
          >
            +
          </button>
        </div>
        <Button
          variant="default"
          className="bg-[#56cfe1] text-white border border-[#56cfe1] w-[170px] uppercase p-4 py-5 rounded-full cursor-pointer"
          onClick={() => removeFromCartMutation.mutateAsync({ productId: id })}
        >
          Remove From Cart
        </Button>
      </>
    );
  }
  return (
    <Button
      variant="default"
      className="bg-[#56cfe1] text-white border border-[#56cfe1] w-[170px] uppercase p-4 py-5 rounded-full cursor-pointer"
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
          color: null,
          total_price_per_product: discounted_price ? discounted_price : price,
        });
      }}
    >
      Add To Cart
    </Button>
  );
}

export default ProductItemInfoCartBtnSection;
