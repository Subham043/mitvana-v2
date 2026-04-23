import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCartHandler } from "../dal/cart";
import { CartType } from "@/lib/types";
import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";


export const CartQueryKey = () => {
    return ["cart"]
};

export const CartQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    return await getCartHandler(signal);
}

export const useCartQuery: () => UseQueryResult<CartType | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken);
    const hydrateCart = useCartStore((state) => state.hydrateCart);
    const cartItems = useCartStore((state) => state.items);

    return useQuery({
        queryKey: CartQueryKey(),
        queryFn: async ({ signal }) => {
            const data = await CartQueryFn({ signal });
            hydrateCart(data);
            return data;
        },
        initialData: {
            user_id: "",
            is_mail_sent: false,
            createdAt: "",
            updatedAt: "",
            total_price: cartItems.reduce((total, item) => total + item.total_price_per_product * item.quantity, 0),
            products: cartItems.map((item) => ({
                quantity: item.quantity,
                total_price_per_product: item.total_price_per_product,
                product: {
                    id: item.product.id,
                    hsn: 0,
                    sku: "",
                    slug: item.product.slug,
                    price: item.product.price,
                    stock: 0,
                    title: item.product.title,
                    thumbnail: item.product.thumbnail,
                    thumbnail_link: item.product.thumbnail_link,
                    discounted_price: item.product.discounted_price,
                },
                color: null,
            })),
            user: {
                id: "",
                name: "",
                email: "",
            },
        },
        enabled: !!authToken,

    });
};