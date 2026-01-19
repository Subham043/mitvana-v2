import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationQueryType, PaginationType, SubscriptionType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { SubscriptionFormValuesType } from "@/utils/data/schema/subscription";

export const createSubscriptionHandler = async (val: SubscriptionFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SubscriptionType }>(api_routes.subscriptions.create, val, { signal });
    return response.data.data;
}

export const updateSubscriptionHandler = async (id: string, val: SubscriptionFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: SubscriptionType }>(api_routes.subscriptions.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteSubscriptionHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: SubscriptionType }>(api_routes.subscriptions.delete + `/${id}`, { signal });
}

export const getSubscriptionHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SubscriptionType }>(api_routes.subscriptions.view + `/${id}`, { signal });
    return response.data.data;
}

export const getSubscriptionsHandler = async (query: PaginationQueryType, signal?: GenericAbortSignal | undefined) => {
    const { page = 1, limit = 10, search = "" } = query;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (search) params.append("search", search);
    const response = await axios.get<{ data: PaginationType<SubscriptionType> }>(api_routes.subscriptions.paginate, { params, signal });
    return response.data.data;
}