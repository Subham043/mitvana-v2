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
    const authToken = useAuthStore((state) => state.authToken);
    const cart = useCartStore((state) => state.cart);
    const setCart = useCartStore((state) => state.setCart);
    return useQuery({
        queryKey: CartNewQueryKey(),
        queryFn: async ({ signal }) => {
            if (!authToken) {
                return Promise.resolve(cart);
            }
            const data = await CartNewQueryFn({ signal });
            setCart(data);
            return data;
        },
        enabled
    });
};

export const useCartProductQuery: (productId: string) => UseQueryResult<CartType["products"][0] | null,
    unknown
> = (productId: string) => {
    const cartProduct = useCartStore((state) => state.cartProduct(productId));
    return useQuery({
        queryKey: CartNewProductQueryKey(productId),
        queryFn: () => cartProduct,
        enabled: !!productId && typeof window !== "undefined",
        staleTime: 0,
    });
};