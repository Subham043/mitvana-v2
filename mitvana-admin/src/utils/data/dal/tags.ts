import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationQueryType, PaginationType, TagType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { TagFormValuesType } from "@/utils/data/schema/tag";

export const createTagHandler = async (val: TagFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: TagType }>(api_routes.tags.create, val, { signal });
    return response.data.data;
}

export const updateTagHandler = async (id: string, val: TagFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: TagType }>(api_routes.tags.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteTagHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: TagType }>(api_routes.tags.delete + `/${id}`, { signal });
}

export const getTagHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: TagType }>(api_routes.tags.view + `/${id}`, { signal });
    return response.data.data;
}

export const getTagsHandler = async (query: PaginationQueryType, signal?: GenericAbortSignal | undefined) => {
    const { page = 1, limit = 10, search = "" } = query;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (search) params.append("search", search);
    const response = await axios.get<{ data: PaginationType<TagType> }>(api_routes.tags.paginate, { params, signal });
    return response.data.data;
}