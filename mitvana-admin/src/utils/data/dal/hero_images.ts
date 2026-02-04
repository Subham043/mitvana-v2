import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, HeroImageType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { HeroImageFormValuesType } from "@/utils/data/schema/hero_image";

export const createHeroImageHandler = async (val: HeroImageFormValuesType, signal?: GenericAbortSignal | undefined) => {
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
    const response = await axios.post<{ data: HeroImageType }>(api_routes.heroImage.create, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const updateHeroImageHandler = async (id: string, val: HeroImageFormValuesType, signal?: GenericAbortSignal | undefined) => {
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
    const response = await axios.put<{ data: HeroImageType }>(api_routes.heroImage.update + `/${id}`, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const deleteHeroImageHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: HeroImageType }>(api_routes.heroImage.delete + `/${id}`, { signal });
}

export const getHeroImageHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: HeroImageType }>(api_routes.heroImage.view + `/${id}`, { signal });
    return response.data.data;
}

export const getHeroImagesHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<HeroImageType> }>(api_routes.heroImage.paginate, { params, signal });
    return response.data.data;
}