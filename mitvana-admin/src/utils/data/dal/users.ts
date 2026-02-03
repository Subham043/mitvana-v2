import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, UserType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { UserCreateFormValuesType } from "@/utils/data/schema/user";
import type { UserUpdateFormValuesType } from "@/utils/data/schema/user";
import type { UserStatusFormValuesType } from "@/utils/data/schema/user";

export const createUserHandler = async (val: UserCreateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: UserType }>(api_routes.users.create, val, { signal });
    return response.data.data;
}

export const updateUserHandler = async (id: string, val: UserUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: UserType }>(api_routes.users.update + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteUserHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: UserType }>(api_routes.users.delete + `/${id}`, { signal });
}

export const toggleUserStatusHandler = async (id: string, val: UserStatusFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.patch<{ data: UserType }>(api_routes.users.toggleBlock + `/${id}`, val, { signal });
    return response.data.data;
}

export const verifyUserHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.patch<{ data: UserType }>(api_routes.users.verify + `/${id}`, {}, { signal });
    return response.data.data;
}

export const getUserHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: UserType }>(api_routes.users.view + `/${id}`, { signal });
    return response.data.data;
}

export const getUsersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<UserType> }>(api_routes.users.paginate, { params, signal });
    return response.data.data;
}