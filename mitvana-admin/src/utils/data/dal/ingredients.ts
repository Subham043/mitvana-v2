import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, IngredientType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { IngredientFormValuesType } from "@/utils/data/schema/ingredient";

export const createIngredientHandler = async (val: IngredientFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const formData = new FormData();
    Object.entries(val).forEach(([key, value]) => {
        if (value !== undefined) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value !== "string") {
                formData.append(key, value.toString());
            } else {
                formData.append(key, value);
            }
        }
    });
    const response = await axios.post<{ data: IngredientType }>(api_routes.ingredient.create, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const updateIngredientHandler = async (id: string, val: IngredientFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const formData = new FormData();
    Object.entries(val).forEach(([key, value]) => {
        if (value !== undefined) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value !== "string") {
                formData.append(key, value.toString());
            } else {
                formData.append(key, value);
            }
        }
    });
    const response = await axios.put<{ data: IngredientType }>(api_routes.ingredient.update + `/${id}`, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const deleteIngredientHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: IngredientType }>(api_routes.ingredient.delete + `/${id}`, { signal });
}

export const getIngredientHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: IngredientType }>(api_routes.ingredient.view + `/${id}`, { signal });
    return response.data.data;
}

export const getIngredientsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<IngredientType> }>(api_routes.ingredient.paginate, { params, signal });
    return response.data.data;
}