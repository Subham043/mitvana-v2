import { create } from "zustand";
import debounce from "lodash.debounce";
import { CartType } from "../types";
import { createCartHandler, deleteCartHandler } from "../data/dal/cart";
import { useAuthStore } from "./auth.store";
import { toastError, toastSuccess } from "@/hooks/useToast";

type Product = {
    id: string;
    title: string;
    price: number;
    discounted_price: number;
    thumbnail?: string;
    thumbnail_link?: string;
    slug: string;
};

type CartItem = {
    product: Product;
    quantity: number;
    color?: string | null;
    total_price_per_product: number;
};

type CartStore = {
    items: CartItem[];

    item: (productId: string, color: string | null) => CartItem | undefined;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string, color?: string | null) => void;
    updateQuantity: (
        productId: string,
        quantity: number,
        color?: string | null
    ) => void;
    clearCart: () => void;
    hydrateCart: (cart: CartType | null) => void;
    prefilCart: () => void;
};

const STORAGE_KEY = "mitvana-cart-storage";

/* ------------------ Local Storage ------------------ */

const loadCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveToStorage = debounce((items: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
}, 300);

/* ------------------ API (Debounced + Rollback) ------------------ */

const saveToDb = debounce(
    async (
        item: { product_id: string; quantity: number },
        rollback: () => void
    ) => {
        const authToken = useAuthStore.getState().authToken;
        if (!authToken) return;

        try {
            await createCartHandler(item);
        } catch (err) {
            rollback();
            toastError("Failed to add/update item to cart. Please try again.");
        }
    },
    500
);

const deleteFromDb = debounce(
    async (id: string | undefined, rollback: () => void) => {
        const authToken = useAuthStore.getState().authToken;
        if (!authToken) return;

        try {
            await deleteCartHandler(id);
        } catch (err) {
            rollback();
            toastError("Failed to delete item from cart. Please try again.");
        }
    },
    500
);

/* ------------------ Store ------------------ */

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    item: (productId: string, color: string | null) => {
        return get().items.find(
            (i) => i.product.id === productId && i.color === color
        );
    },

    /* ------------------ ADD ------------------ */

    addToCart: (item) => {
        const prevItems = get().items;
        const items = [...prevItems];

        const index = items.findIndex(
            (i) =>
                i.product.id === item.product.id && i.color === item.color
        );

        if (index !== -1) {
            items[index].quantity += item.quantity;
        } else {
            items.push(item);
        }

        set({ items });
        saveToStorage(items);

        saveToDb(
            { product_id: item.product.id, quantity: item.quantity },
            () => {
                set({ items: prevItems });
                saveToStorage(prevItems);
            }
        );
        toastSuccess("Item added to cart successfully.");
    },

    /* ------------------ REMOVE ------------------ */

    removeFromCart: (productId, color = null) => {
        const prevItems = get().items;

        const items = prevItems.filter(
            (i) =>
                !(i.product.id === productId && i.color === color)
        );

        set({ items });
        saveToStorage(items);

        deleteFromDb(productId, () => {
            set({ items: prevItems });
            saveToStorage(prevItems);
        });
        toastSuccess("Item removed from cart successfully.");
    },

    /* ------------------ UPDATE ------------------ */

    updateQuantity: (productId, quantity, color = null) => {
        const prevItems = get().items;

        const items = prevItems.map((i) => {
            if (i.product.id === productId && i.color === color) {
                return { ...i, quantity };
            }
            return i;
        });

        set({ items });
        saveToStorage(items);

        saveToDb(
            { product_id: productId, quantity },
            () => {
                set({ items: prevItems });
                saveToStorage(prevItems);
            }
        );
    },

    /* ------------------ CLEAR ------------------ */

    clearCart: () => {
        const prevItems = get().items;

        set({ items: [] });
        saveToStorage([]);

        deleteFromDb(undefined, () => {
            set({ items: prevItems });
            saveToStorage(prevItems);
        });
        toastSuccess("Cart cleared successfully.");
    },

    /* ------------------ HYDRATE ------------------ */

    hydrateCart: (cart: CartType | null) => {
        if (!cart) return;

        const items = cart.products.map((i) => ({
            product: {
                id: i.product.id,
                title: i.product.title,
                price: i.product.price,
                discounted_price: i.product.discounted_price,
                thumbnail: i.product.thumbnail,
                thumbnail_link: i.product.thumbnail_link,
                slug: i.product.slug,
            },
            quantity: i.quantity,
            color: i.color?.id || null,
            total_price_per_product: i.total_price_per_product,
        }));

        set({ items });
        saveToStorage(items);
    },

    /* ------------------ PREFILL ------------------ */

    prefilCart: () => {
        const items = loadCart();
        set({ items });
    },
}));