import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, OfferType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { OfferFormValuesType } from "@/utils/data/schema/offer";

export const createOfferHandler = async (val: OfferFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const { products, ...rest } = val
    const response = await axios.post<{ data: OfferType }>(api_routes.offers.create, { ...rest, products: products ? products.map((product) => product.value) : [] }, { signal });
    return response.data.data;
}

export const updateOfferHandler = async (id: string, val: OfferFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const { products, ...rest } = val
    const response = await axios.put<{ data: OfferType }>(api_routes.offers.update + `/${id}`, { ...rest, products: products ? products.map((product) => product.value) : [] }, { signal });
    return response.data.data;
}

export const deleteOfferHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: OfferType }>(api_routes.offers.delete + `/${id}`, { signal });
}

export const getOfferHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: OfferType }>(api_routes.offers.view + `/${id}`, { signal });
    return response.data.data;
}

export const getOffersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<OfferType> }>(api_routes.offers.paginate, { params, signal });
    return response.data.data;
}