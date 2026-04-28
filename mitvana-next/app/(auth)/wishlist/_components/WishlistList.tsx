"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import CustomPagination from "@/components/CustomPagination";
import EmptySection from "@/components/EmptySection";
import { Spinner } from "@/components/ui/spinner";
import { useWishlistQuery } from "@/lib/data/queries/wishlist";
import { Heart } from "lucide-react";

export default function WishlistList() {
  const { data, isLoading } = useWishlistQuery();
  if (isLoading) {
    return (
      <div className="text-center w-full flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }
  if (!data || data.data.length === 0) {
    return (
      <EmptySection
        title="No Wishlist Yet"
        description="You haven't added any product to your wishlist yet. Get started by adding your first product to the wishlist."
        Icon={Heart}
      />
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data.data.map((item) => (
          <ProductCard
            key={item.product.id}
            id={item.product.id}
            thumbnail={item.product.thumbnail}
            thumbnail_link={
              item.product.thumbnail_link
                ? item.product.thumbnail_link
                : undefined
            }
            product_images={item.product.product_images}
            slug={item.product.slug}
            title={item.product.title}
            name={item.product.title}
            stock={item.product.stock || 0}
            tags={item.product.tags}
            price={item.product.price}
            discounted_price={item.product.discounted_price || 0}
            hsn={item.product.hsn}
            sku={item.product.sku}
            is_in_wishlist={true}
          />
        ))}
      </div>
      <div className="mt-5">
        <CustomPagination totalCount={data.meta.total} />
      </div>
    </>
  );
}
