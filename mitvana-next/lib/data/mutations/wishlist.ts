import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createWishlistHandler, deleteWishlistHandler } from "../dal/wishlist";
import { WishlistQueryKey } from "../queries/wishlist";
import { ProductSlugQueryKey, PublishedProductsQueryKey } from "../queries/product";
import { PaginationType, ProductListType, ProductType } from "@/lib/types";
import { hairCareParams, onSaleParams, skinCareParams, trendingParams } from "@/app/(home)/_lib/search-params.option";

function makeUpdatedPaginationData(oldData: PaginationType<ProductListType> | undefined, productId: string, isInWishlist: boolean) {
    if (!oldData) return oldData;
    const updated = oldData.data.map(item => {
        if (item.id === productId) {
            return {
                ...item,
                is_in_wishlist: isInWishlist,
            };
        }
        return item;
    });
    return { ...oldData, data: updated };
}

function makeUpdatedSlugData(oldData: ProductType | undefined, productId: string, isInWishlist: boolean) {
    if (!oldData) return oldData;
    return {
        ...oldData,
        is_in_wishlist: isInWishlist,
        related_products: oldData.related_products.map(item => {
            if (item.id === productId) {
                return {
                    ...item,
                    is_in_wishlist: isInWishlist,
                };
            }
            return item;
        })
    }
}

export const useWishlistAddMutation = () => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async (val: { product_id: string; slug: string }) => {
            return await createWishlistHandler(val);
        },
        onSuccess: (_, val, ___, context) => {
            toastSuccess("Product added to wishlist successfully");
            context.client.invalidateQueries({ queryKey: WishlistQueryKey(params) });
            context.client.setQueryData(PublishedProductsQueryKey(params), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, true));
            context.client.setQueryData(PublishedProductsQueryKey(skinCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, true));
            context.client.setQueryData(PublishedProductsQueryKey(hairCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, true));
            context.client.setQueryData(PublishedProductsQueryKey(onSaleParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, true));
            context.client.setQueryData(PublishedProductsQueryKey(trendingParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, true));
            context.client.setQueryData(ProductSlugQueryKey(val.slug), (oldData: ProductType | undefined) => makeUpdatedSlugData(oldData, val.product_id, true));
        },
    });
};

export const useWishlistRemoveMutation = () => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return useMutation({
        mutationFn: async (val: { product_id: string; slug: string }) => {
            await deleteWishlistHandler(val.product_id);
        },
        onSuccess: (_, val, ___, context) => {
            toastSuccess("Product removed from wishlist successfully");
            const wishlistKey = WishlistQueryKey(params);
            const oldWishlist = context.client.getQueryData<PaginationType<ProductListType>>(wishlistKey);

            if (pathname === "/wishlist" && oldWishlist) {
                if (oldWishlist.meta.page > 1 && oldWishlist.data.length === 1) {
                    const searchParams = new URLSearchParams(params);
                    searchParams.set("page", (oldWishlist.meta.page - 1).toString());
                    router.replace(pathname + "?" + searchParams.toString());
                    context.client.invalidateQueries({ queryKey: WishlistQueryKey(searchParams) });
                    return;
                }
            }
            context.client.invalidateQueries({ queryKey: WishlistQueryKey(params) });
            context.client.setQueryData(PublishedProductsQueryKey(params), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(skinCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(hairCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(onSaleParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(trendingParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(ProductSlugQueryKey(val.slug), (oldData: ProductType | undefined) => makeUpdatedSlugData(oldData, val.product_id, false));
        },
    });
};