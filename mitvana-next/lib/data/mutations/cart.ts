import { useToast } from "@/hooks/useToast";
import { CartType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/lib/store/cart.store";
import { CartNewProductQueryKey, CartNewQueryKey } from "../queries/cart";
import { createCartHandler, deleteCartHandler, getCartHandler } from "../dal/cart";
import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { useAuthStore } from "@/lib/store/auth.store";


export const useAddCartMutation = () => {
    const { toastSuccess, toastError } = useToast();
    const authToken = useAuthStore((state) => state.authToken);
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const prevCart = useRef<CartType | null>(null);
    const debounceSaveCart = useDebounceSaveCartMutation();

    // ✅ always keep latest mutate
    const mutateRef = useRef(debounceSaveCart.mutate);

    useEffect(() => {
        mutateRef.current = debounceSaveCart.mutate;
    }, [debounceSaveCart.mutate]);

    // ✅ stable debounce
    const debouncedSaveRef = useRef(
        debounce((val: {
            productId: string;
            quantity: number,
            prevCart: CartType | null
        }) => {
            mutateRef.current(val);
        }, 500)
    );

    // ✅ cleanup
    useEffect(() => {
        return () => {
            debouncedSaveRef.current.cancel();
        };
    }, []);

    return useMutation({
        mutationFn: async (val: CartType["products"][0]) => {
            if (val.product.stock < 1) {
                return Promise.reject(new Error("Product is out of stock"));
            }
            prevCart.current = useCartStore.getState().cart;
            addToCart(val);
            return Promise.resolve(cart);
        },
        onSuccess: (_, val, __, context) => {
            toastSuccess("Product added to cart successfully");
            context.client.setQueryData(CartNewQueryKey(), cart);
            context.client.setQueryData(CartNewProductQueryKey(val.product.id), val);
            if (authToken) {
                debouncedSaveRef.current({
                    productId: val.product.id,
                    quantity: val.quantity,
                    prevCart: prevCart.current,
                });
            }
        },
        onError: (_, __, ___, context) => {
            toastError("Product is out of stock");
        }
    });
};

export const useUpdateCartMutation = () => {
    const { toastError } = useToast();
    const cart = useCartStore((state) => state.cart);
    const authToken = useAuthStore((state) => state.authToken);
    const cartProduct = useCartStore((state) => state.cartProduct);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const prevCart = useRef<CartType | null>(null);
    const debounceSaveCart = useDebounceSaveCartMutation();

    // ✅ always keep latest mutate
    const mutateRef = useRef(debounceSaveCart.mutate);

    useEffect(() => {
        mutateRef.current = debounceSaveCart.mutate;
    }, [debounceSaveCart.mutate]);

    // ✅ stable debounce
    const debouncedSaveRef = useRef(
        debounce((val: {
            productId: string;
            quantity: number,
            prevCart: CartType | null
        }) => {
            mutateRef.current(val);
        }, 500)
    );

    // ✅ cleanup
    useEffect(() => {
        return () => {
            debouncedSaveRef.current.cancel();
        };
    }, []);

    return useMutation({
        mutationFn: async (val: { productId: string, quantity: number, stock: number }) => {
            if (val.quantity > val.stock) {
                return Promise.reject(new Error("Quantity is greater than stock"));
            }
            prevCart.current = useCartStore.getState().cart;
            updateQuantity(val.productId, val.quantity);
            return Promise.resolve(cart);
        },
        onSuccess: (_, val, __, context) => {
            context.client.setQueryData(CartNewQueryKey(), cart);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), cartProduct(val.productId));
            if (authToken) {
                debouncedSaveRef.current({
                    productId: val.productId,
                    quantity: val.quantity,
                    prevCart: prevCart.current,
                });
            }
        },
        onError: (_, __, ___, context) => {
            toastError("Quantity is greater than stock");
        }
    });
};

export const useRemoveCartMutation = () => {
    const cart = useCartStore((state) => state.cart);
    const authToken = useAuthStore((state) => state.authToken);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const prevCart = useRef<CartType | null>(null);
    const debounceRemoveCart = useDebounceRemoveCartMutation();

    return useMutation({
        mutationFn: async (val: { productId: string }) => {
            prevCart.current = useCartStore.getState().cart;
            removeFromCart(val.productId);
            return Promise.resolve(cart);
        },
        onSuccess: (_, val, __, context) => {
            context.client.setQueryData(CartNewQueryKey(), cart);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), undefined);
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
            if (authToken) {
                debounceRemoveCart.mutateAsync({
                    productId: val.productId,
                    prevCart: prevCart.current,
                });
            }
        }
    });
};

export const useDebounceSaveCartMutation = () => {
    const setCart = useCartStore((state) => state.setCart);
    return useMutation({
        mutationFn: async (val: { productId: string, quantity: number, prevCart: CartType | null }) => {
            return await createCartHandler({ product_id: val.productId, quantity: val.quantity });
        },
        onSuccess: (data, val, _, context) => {
            context.client.setQueryData(CartNewQueryKey(), data);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), data?.products.find((item) => item.product.id === val.productId));
        },
        onError: (_, val, __, context) => {
            setCart(val.prevCart);
            context.client.setQueryData(CartNewQueryKey(), val.prevCart);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), val.prevCart?.products.find((item) => item.product.id === val.productId));
            context.client.invalidateQueries({ queryKey: CartNewQueryKey() });
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
        },
    });
}

export const useDebounceRemoveCartMutation = () => {
    const setCart = useCartStore((state) => state.setCart);
    return useMutation({
        mutationFn: async (val: { productId: string, prevCart: CartType | null }) => {
            return await deleteCartHandler(val.productId);
        },
        onSuccess: (data, val, _, context) => {
            context.client.setQueryData(CartNewQueryKey(), data);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), data?.products.find((item) => item.product.id === val.productId));
        },
        onError: (_, val, __, context) => {
            setCart(val.prevCart);
            context.client.setQueryData(CartNewQueryKey(), val.prevCart);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), val.prevCart?.products.find((item) => item.product.id === val.productId));
            context.client.invalidateQueries({ queryKey: CartNewQueryKey() });
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
        },
    });
}

export const useSyncCartMutation = () => {
    const cartProducts = useCartStore((state) => state.cartProducts)
    const setCart = useCartStore((state) => state.setCart)
    return useMutation({
        mutationFn: async () => {
            const cart = await Promise.all(
                cartProducts().map((cartProduct) => createCartHandler({
                    product_id: cartProduct.product.id,
                    quantity: cartProduct.quantity,
                }))
            )
            if (cart.length > 0) {
                return Promise.resolve(cart[cart.length - 1]);
            }
            const data = await getCartHandler();
            return Promise.resolve(data);
        },
        onSuccess: (data, _, __, context) => {
            setCart(data);
            context.client.setQueryData(CartNewQueryKey(), data);
        },
        onError: (_, __, ___, context) => {
            setCart(null);
            context.client.setQueryData(CartNewQueryKey(), null);
        },
    });
}

