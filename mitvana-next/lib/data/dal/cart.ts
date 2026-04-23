import axios from "@/lib/axios";
import { api_routes } from "@/lib/constants/routes.option";
import { CartType } from "@/lib/types";
import { GenericAbortSignal } from "axios";


export const createCartHandler = async (val: { product_id: string; quantity: number; }, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: CartType }>(api_routes.cart.post, val, { signal });
    return response.data.data;
}

export const deleteCartHandler = async (id?: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete(api_routes.cart.post + `${id ? `/${id}` : ""}`, { signal });
}

export const getCartHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CartType }>(api_routes.cart.get, { signal });
    return response.data.data;
}