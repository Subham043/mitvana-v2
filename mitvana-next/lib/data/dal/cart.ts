import axios from "@/lib/axios";
import { api_routes } from "@/lib/constants/routes.option";
import { CartType } from "@/lib/types";
import { GenericAbortSignal } from "axios";


export const createCartHandler = async (val: { product_id: string; quantity: number; }, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: CartType | null }>(api_routes.cart.post, val, { signal });
    return response.data.data;
}

export const deleteCartHandler = async (id?: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.delete<{ data: CartType | null }>(api_routes.cart.post + `${id ? `/${id}` : ""}`, { signal });
    return response.data.data;
}

export const getCartHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CartType | null }>(api_routes.cart.get, { signal });
    return response.data.data;
}