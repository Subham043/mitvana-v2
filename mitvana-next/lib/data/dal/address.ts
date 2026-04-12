import axios from "@/lib/axios";
import type { PaginationType, AddressType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { AddressFormValuesType } from "@/lib/data/schemas/address";
import { api_routes } from "@/lib/constants/routes.option";

export const createAddressHandler = async (val: AddressFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: AddressType }>(api_routes.address.create, val, { signal });
    return response.data.data;
}

export const updateAddressHandler = async (id: string, val: AddressFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: AddressType }>(api_routes.address.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteAddressHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: AddressType }>(api_routes.address.delete + `/${id}`, { signal });
}

export const getAddressHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: AddressType }>(api_routes.address.get + `/${id}`, { signal });
    return response.data.data;
}

export const getAddresssHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<AddressType> }>(api_routes.address.get, { params, signal });
    return response.data.data;
}