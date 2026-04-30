import { create } from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { CartType } from "../types";
import { useAuthStore } from "./auth.store";

const noopStorage: StateStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
};

type CartStore = {
    cart: CartType | null;

    cartProducts: () => CartType["products"];

    cartProduct: (productId: string) => CartType["products"][0] | null;

    addToCart: (product: CartType["products"][0]) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (
        productId: string,
        quantity: number,
    ) => void;
    clearCart: () => void;
    setCart: (cart: CartType | null) => void;
};

const calculateCartTotals = (cart: CartType, products: CartType["products"]) => {
    const sub_total = products.reduce(
        (acc, item) => acc + item.total_price_per_product,
        0
    );

    const isValidCoupon =
        cart.coupon && sub_total >= cart.coupon.min_cart_value;

    const discount = isValidCoupon
        ? sub_total * (cart.coupon!.discount_percentage / 100)
        : 0;

    return {
        sub_total,
        discount,
        total_price: sub_total + cart.shipping_charges - discount,
    };
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: null,
            cartProducts: () => {
                const cart = get().cart;
                if (!cart) return [];
                return cart.products;
            },
            cartProduct: (productId: string) => {
                const products = get().cartProducts();
                if (!products || products.length === 0) return null;
                return products.find((item) => item.product.id === productId) || null;
            },
            addToCart: (product) => {
                const cart = get().cart;
                const authUser = useAuthStore.getState().authUser;

                if (!cart) {
                    const newCart: CartType = {
                        user_id: authUser?.id || new Date().getTime().toString(),
                        user: authUser
                            ? {
                                id: authUser.id,
                                name: authUser.name,
                                email: authUser.email,
                            }
                            : { id: "", name: "", email: "" },
                        is_mail_sent: false,
                        sub_total: product.total_price_per_product,
                        shipping_charges: 0,
                        discount: 0,
                        total_price: product.total_price_per_product,
                        coupon: null,
                        address: null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        products: [product],
                    };

                    set({ cart: newCart });
                    return;
                }

                const existingIndex = cart.products.findIndex(
                    (item) => item.product.id === product.product.id
                );

                let newProducts;

                if (existingIndex !== -1) {
                    newProducts = cart.products.map((item, i) => {
                        if (i !== existingIndex) return item;

                        const quantity = item.quantity + product.quantity;
                        const price = item.product.discounted_price ?? item.product.price;

                        return {
                            ...item,
                            quantity,
                            total_price_per_product: quantity * price,
                        };
                    });
                } else {
                    newProducts = [...cart.products, product];
                }

                const { sub_total, discount, total_price } = calculateCartTotals(cart, newProducts);

                const newCart = {
                    ...cart,
                    products: newProducts,
                    sub_total,
                    discount,
                    total_price,
                };

                set({ cart: newCart });
            },
            updateQuantity: (productId, quantity) => {
                const cart = get().cart;
                if (!cart) return;

                const newProducts = cart.products.map((item) => {
                    if (item.product.id !== productId) return item;

                    const price =
                        item.product.discounted_price ?? item.product.price;

                    return {
                        ...item,
                        quantity,
                        total_price_per_product: quantity * price,
                    };
                });

                const { sub_total, discount, total_price } = calculateCartTotals(cart, newProducts);

                set({
                    cart: {
                        ...cart,
                        products: newProducts,
                        sub_total,
                        discount,
                        total_price,
                    },
                });
            },
            removeFromCart: (productId) => {
                const cart = get().cart;
                if (!cart) return;

                const newProducts = cart.products.filter(
                    (item) => item.product.id !== productId
                );

                const { sub_total, discount, total_price } = calculateCartTotals(cart, newProducts);

                set({
                    cart: {
                        ...cart,
                        products: newProducts,
                        sub_total,
                        discount,
                        total_price,
                    },
                });
            },
            clearCart: () => {
                set((state) => ({ ...state, cart: null }));
            },
            setCart: (cart: CartType | null) => {
                set((state) => ({ ...state, cart }));
            },
        }),
        {
            name: "mitvana-cart-storage-new",
            storage: createJSONStorage(() =>
                typeof window !== "undefined" ? localStorage : noopStorage
            ),
        }
    )
);