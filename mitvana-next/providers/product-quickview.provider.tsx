"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuickViewStore } from "@/lib/store/quickview.store";
import ProductQuickViewSkeleton from "@/components/QuickView/ProductQuickViewSkeleton";
import { useProductSlugQuery } from "@/lib/data/queries/product";
import ProductQuickView from "@/components/QuickView";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ProductQuickViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const modal = useQuickViewStore((s) => s.modal);
  const setModal = useQuickViewStore((s) => s.setModal);

  const { data, isLoading } = useProductSlugQuery(
    modal.show ? modal.slug : "",
    undefined,
    modal.show && modal.slug.length > 0,
  );
  return (
    <>
      {children}
      <Dialog
        open={modal.show}
        onOpenChange={(val) => {
          if (!val) setModal({ show: false });
        }}
      >
        <DialogContent style={{ width: "65dvw" }}>
          <VisuallyHidden>
            <DialogTitle>Product Quick View</DialogTitle>
            <DialogDescription>Product Quick View</DialogDescription>
          </VisuallyHidden>
          {isLoading ? (
            <ProductQuickViewSkeleton />
          ) : (
            data && (
              <ProductQuickView
                title={data.title}
                sub_title={data.sub_title}
                reviews_count={data.reviews_count}
                discounted_price={data.discounted_price}
                price={data.price}
                saved_price={data.saved_price}
                saved_percentage={data.saved_percentage}
                child_products={data.child_products}
                product_images={data.product_images}
                thumbnail_link={data.thumbnail_link}
                stock={data.stock}
                id={data.id}
                thumbnail={data.thumbnail}
                slug={data.slug}
                hsn={data.hsn}
                sku={data.sku}
                is_in_wishlist={data.is_in_wishlist}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
