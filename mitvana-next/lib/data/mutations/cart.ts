import { useToast } from "@/hooks/useToast";
import { CartType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/lib/store/cart.store";
import { CartNewProductQueryKey, CartNewQueryKey } from "../queries/cart";
import { applyCouponHandler, createCartHandler, deleteCartHandler, getCartHandler, removeCouponHandler, selectAddressHandler } from "../dal/cart";
import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { useAuthStore } from "@/lib/store/auth.store";
import { ApplyCouponFormValuesType, SelectAddressFormValuesType } from "../schemas/cart";


export const useAddCartMutation = () => {
    const { toastSuccess, toastError } = useToast();
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
            useCartStore.getState().addToCart(val);
            return Promise.resolve(useCartStore.getState().cart);
        },
        onSuccess: (_, val, __, context) => {
            toastSuccess("Product added to cart successfully");
            context.client.setQueryData(CartNewQueryKey(), () => useCartStore.getState().cart ? { ...useCartStore.getState().cart } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.product.id), () => useCartStore.getState().cartProduct(val.product.id) ? { ...useCartStore.getState().cartProduct(val.product.id) } : null);
            if (useAuthStore.getState().authToken) {
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
            useCartStore.getState().updateQuantity(val.productId, val.quantity);
            return Promise.resolve(useCartStore.getState().cart);
        },
        onSuccess: (_, val, __, context) => {
            context.client.setQueryData(CartNewQueryKey(), () => useCartStore.getState().cart ? { ...useCartStore.getState().cart } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => useCartStore.getState().cartProduct(val.productId) ? { ...useCartStore.getState().cartProduct(val.productId) } : null);
            if (useAuthStore.getState().authToken) {
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
    const prevCart = useRef<CartType | null>(null);
    const debounceRemoveCart = useDebounceRemoveCartMutation();

    return useMutation({
        mutationFn: async (val: { productId: string }) => {
            prevCart.current = useCartStore.getState().cart;
            useCartStore.getState().removeFromCart(val.productId);
            return Promise.resolve(useCartStore.getState().cart);
        },
        onSuccess: (_, val, __, context) => {
            context.client.setQueryData(CartNewQueryKey(), () => useCartStore.getState().cart ? { ...useCartStore.getState().cart } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => undefined);
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
            if (useAuthStore.getState().authToken) {
                debounceRemoveCart.mutateAsync({
                    productId: val.productId,
                    prevCart: prevCart.current,
                });
            }
        }
    });
};

export const useDebounceSaveCartMutation = () => {
    return useMutation({
        mutationFn: async (val: { productId: string, quantity: number, prevCart: CartType | null }) => {
            return await createCartHandler({ product_id: val.productId, quantity: val.quantity });
        },
        onSuccess: (data, val, _, context) => {
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => data?.products.find((item) => item.product.id === val.productId));
        },
        onError: (_, val, __, context) => {
            useCartStore.getState().setCart(val.prevCart);
            context.client.setQueryData(CartNewQueryKey(), () => val.prevCart ? { ...val.prevCart } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => val.prevCart?.products.find((item) => item.product.id === val.productId));
            context.client.invalidateQueries({ queryKey: CartNewQueryKey() });
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
        },
    });
}

export const useDebounceRemoveCartMutation = () => {
    return useMutation({
        mutationFn: async (val: { productId: string, prevCart: CartType | null }) => {
            return await deleteCartHandler(val.productId);
        },
        onSuccess: (data, val, _, context) => {
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => data?.products.find((item) => item.product.id === val.productId));
        },
        onError: (_, val, __, context) => {
            useCartStore.getState().setCart(val.prevCart);
            context.client.setQueryData(CartNewQueryKey(), () => val.prevCart ? { ...val.prevCart } : null);
            context.client.setQueryData(CartNewProductQueryKey(val.productId), () => val.prevCart?.products.find((item) => item.product.id === val.productId));
            context.client.invalidateQueries({ queryKey: CartNewQueryKey() });
            context.client.invalidateQueries({ queryKey: CartNewProductQueryKey(val.productId) });
        },
    });
}

export const useSyncCartMutation = () => {
    return useMutation({
        mutationFn: async () => {
            const cart = await Promise.all(
                useCartStore.getState().cartProducts().map((cartProduct) => createCartHandler({
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
            useCartStore.getState().setCart(data);
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
        },
        onError: (_, __, ___, context) => {
            useCartStore.getState().setCart(null);
            context.client.setQueryData(CartNewQueryKey(), () => null);
        },
    });
}

export const useApplyCouponMutation = () => {
    const { toastError, toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: ApplyCouponFormValuesType) => {
            return await applyCouponHandler(val);
        },
        onSuccess: (data, _, __, context) => {
            toastSuccess("Coupon applied successfully");
            useCartStore.getState().setCart(data);
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
        },
        onError: (_, __, ___, ____) => {
            toastError("Invalid coupon code");
        },
    });
}

export const useRemoveCouponMutation = () => {
    const { toastError, toastSuccess } = useToast();
    return useMutation({
        mutationFn: async () => {
            return await removeCouponHandler();
        },
        onSuccess: (data, _, __, context) => {
            toastSuccess("Coupon removed successfully");
            useCartStore.getState().setCart(data);
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
        },
        onError: (_, __, ___, ____) => {
            toastError("Failed to remove coupon");
        },
    });
}

export const useSelectAddressMutation = () => {
    const { toastError, toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: SelectAddressFormValuesType) => {
            return await selectAddressHandler(val);
        },
        onSuccess: (data, _, __, context) => {
            toastSuccess("Address selected successfully");
            useCartStore.getState().setCart(data);
            context.client.setQueryData(CartNewQueryKey(), () => data ? { ...data } : null);
        },
        onError: (_, __, ___, ____) => {
            toastError("Failed to select address");
        },
    });
}

