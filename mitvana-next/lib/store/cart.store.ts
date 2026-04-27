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
            addToCart: (product: CartType["products"][0]) => {
                const cart = get().cart;
                const authUser = useAuthStore.getState().authUser;
                if (!cart) {
                    const data: CartType = {
                        user_id: "",
                        user: {
                            id: "",
                            name: "",
                            email: "",
                        },
                        is_mail_sent: false,
                        total_price: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        products: [
                            product
                        ]
                    };
                    data["total_price"] = product.total_price_per_product;
                    if (authUser) {
                        data["user_id"] = authUser.id;
                        data["user"] = {
                            id: authUser.id,
                            name: authUser.name,
                            email: authUser.email,
                        };
                    } else {
                        const user_id = new Date().getTime().toString();
                        data["user_id"] = user_id;
                        data["user"] = {
                            id: user_id,
                            name: "",
                            email: "",
                        };
                    }
                    set((state) => ({ ...state, cart: data }));
                } else {
                    const existingProductIndex = cart.products.findIndex((item) => item.product.id === product.product.id);
                    if (existingProductIndex !== -1) {
                        cart.products[existingProductIndex].quantity += product.quantity;
                        cart.products[existingProductIndex].total_price_per_product = product.quantity * (product.product.discounted_price ? product.product.discounted_price : product.product.price);
                        cart.total_price = cart.products.reduce((acc, item) => acc + item.total_price_per_product, 0);
                    } else {
                        cart.products.push(product);
                        cart.total_price += product.total_price_per_product;
                    }
                    set((state) => ({ ...state, cart }));
                }
            },
            removeFromCart: (productId: string) => {
                const cart = get().cart;
                if (!cart) return;
                const products = cart.products.filter((item) => item.product.id !== productId);
                cart.total_price = products.reduce((acc, item) => acc + item.total_price_per_product, 0);
                set((state) => ({ ...state, cart: { ...cart, products } }));
            },
            updateQuantity: (productId: string, quantity: number) => {
                const cart = get().cart;
                if (!cart) return;
                const existingProductIndex = cart.products.findIndex((item) => item.product.id === productId);
                if (existingProductIndex !== -1) {
                    cart.products[existingProductIndex].quantity = quantity;
                    cart.products[existingProductIndex].total_price_per_product = quantity * (cart.products[existingProductIndex].product.discounted_price ? cart.products[existingProductIndex].product.discounted_price : cart.products[existingProductIndex].product.price);
                    cart.total_price = cart.products.reduce((acc, item) => acc + item.total_price_per_product, 0);
                    set((state) => ({ ...state, cart }));
                }
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