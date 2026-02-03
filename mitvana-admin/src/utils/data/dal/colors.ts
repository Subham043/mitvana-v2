import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, ColorType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { ColorFormValuesType } from "@/utils/data/schema/color";

export const createColorHandler = async (val: ColorFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: ColorType }>(api_routes.colors.create, val, { signal });
    return response.data.data;
}

export const updateColorHandler = async (id: string, val: ColorFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: ColorType }>(api_routes.colors.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteColorHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: ColorType }>(api_routes.colors.delete + `/${id}`, { signal });
}

export const getColorHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ColorType }>(api_routes.colors.view + `/${id}`, { signal });
    return response.data.data;
}

export const getColorsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ColorType> }>(api_routes.colors.paginate, { params, signal });
    return response.data.data;
}