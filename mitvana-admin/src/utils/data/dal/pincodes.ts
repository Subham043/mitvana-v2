import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationQueryType, PaginationType, PincodeType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { PincodeFormValuesType } from "@/utils/data/schema/pincode";

export const createPincodeHandler = async (val: PincodeFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: PincodeType }>(api_routes.pincode.create, val, { signal });
    return response.data.data;
}

export const updatePincodeHandler = async (id: string, val: PincodeFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: PincodeType }>(api_routes.pincode.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deletePincodeHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: PincodeType }>(api_routes.pincode.delete + `/${id}`, { signal });
}

export const getPincodeHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PincodeType }>(api_routes.pincode.view + `/${id}`, { signal });
    return response.data.data;
}

export const getPincodeByCodeHandler = async (pincode: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PincodeType }>(api_routes.pincode.viewByCode + `/${pincode}`, { signal });
    return response.data.data;
}

export const getPincodesHandler = async (query: PaginationQueryType, signal?: GenericAbortSignal | undefined) => {
    const { page = 1, limit = 10, search = "" } = query;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (search) params.append("search", search);
    const response = await axios.get<{ data: PaginationType<PincodeType> }>(api_routes.pincode.paginate, { params, signal });
    return response.data.data;
}