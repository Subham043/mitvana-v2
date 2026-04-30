import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCartHandler } from "../dal/cart";
import { CartType } from "@/lib/types";
import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";


export const CartNewQueryKey = () => {
    return ["cart-new"]
};

export const CartNewProductQueryKey = (productId: string) => {
    return ["cart-new", productId]
};

export const CartNewQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    return await getCartHandler(signal);
}

export const useCartNewQuery: (enabled?: boolean) => UseQueryResult<CartType | null | undefined,
    unknown
> = (enabled = false) => {
    return useQuery({
        queryKey: CartNewQueryKey(),
        queryFn: async ({ signal }) => {
            if (!useAuthStore.getState().authToken) {
                return Promise.resolve(useCartStore.getState().cart);
            }
            const data = await CartNewQueryFn({ signal });
            useCartStore.getState().setCart(data);
            return data;
        },
        enabled
    });
};

export const useCartProductQuery: (productId: string) => UseQueryResult<CartType["products"][0] | null,
    unknown
> = (productId: string) => {
    return useQuery({
        queryKey: CartNewProductQueryKey(productId),
        queryFn: () => useCartStore.getState().cartProduct(productId),
        enabled: !!productId && typeof window !== "undefined",
        staleTime: 0,
    });
};