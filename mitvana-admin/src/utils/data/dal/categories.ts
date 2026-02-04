import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, CategoryType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { CategoryCreateFormValuesType, CategoryUpdateFormValuesType } from "@/utils/data/schema/category";

export const createCategoryHandler = async (val: CategoryCreateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: CategoryType }>(api_routes.category.create, val, { signal });
    return response.data.data;
}

export const updateCategoryHandler = async (id: string, val: CategoryUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: CategoryType }>(api_routes.category.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteCategoryHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: CategoryType }>(api_routes.category.delete + `/${id}`, { signal });
}

export const getCategoryHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CategoryType }>(api_routes.category.view + `/${id}`, { signal });
    return response.data.data;
}

export const getCategoryBySlugHandler = async (slug: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CategoryType }>(api_routes.category.viewBySlug + `/${slug}`, { signal });
    return response.data.data;
}

export const getCategoriesHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<CategoryType> }>(api_routes.category.paginate, { params, signal });
    return response.data.data;
}