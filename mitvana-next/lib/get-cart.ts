import { env } from "@/config/env";
import { api_routes } from "./constants/routes.option";
import type { CartType } from "./types";

export async function getCart(token: string) {

    const res = await fetch(`${env.API_ENDPOINT}${api_routes.cart.get}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json() as { data: CartType };

    return data.data;
}