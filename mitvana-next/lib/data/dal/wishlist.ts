import axios from "@/lib/axios";
import { api_routes } from "@/lib/constants/routes.option";
import { PaginationType, WishlistType } from "@/lib/types";
import { GenericAbortSignal } from "axios";


export const createWishlistHandler = async (val: { product_id: string }, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: WishlistType }>(api_routes.wishlist.post, val, { signal });
    return response.data.data;
}

export const deleteWishlistHandler = async (id?: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete(api_routes.wishlist.post + `${id ? `/${id}` : ""}`, { signal });
}

export const getWishlistHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<WishlistType> }>(api_routes.wishlist.get, { params, signal });
    return response.data.data;
}