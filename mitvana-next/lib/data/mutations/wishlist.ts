import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
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
                is_in_wishlist: true,
            };
        }
        return item;
    });
    return { ...oldData, data: updated };
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
            context.client.setQueryData(ProductSlugQueryKey(val.slug), (oldData: ProductType | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    is_in_wishlist: true,
                    related_products: oldData.related_products.map(item => {
                        if (item.id === val.product_id) {
                            return {
                                ...item,
                                is_in_wishlist: true,
                            };
                        }
                        return item;
                    })
                }
            })
        },
    });
};

export const useWishlistRemoveMutation = () => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async (val: { product_id: string; slug: string }) => {
            return await deleteWishlistHandler(val.product_id);
        },
        onSuccess: (_, val, ___, context) => {
            toastSuccess("Product removed from wishlist successfully");
            context.client.invalidateQueries({ queryKey: WishlistQueryKey(params) });
            context.client.setQueryData(PublishedProductsQueryKey(params), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(skinCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(hairCareParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(onSaleParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(PublishedProductsQueryKey(trendingParams), (oldData: PaginationType<ProductListType> | undefined) => makeUpdatedPaginationData(oldData, val.product_id, false));
            context.client.setQueryData(ProductSlugQueryKey(val.slug), (oldData: ProductType | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    is_in_wishlist: false,
                    related_products: oldData.related_products.map(item => {
                        if (item.id === val.product_id) {
                            return {
                                ...item,
                                is_in_wishlist: false,
                            };
                        }
                        return item;
                    })
                }
            })
        },
    });
};