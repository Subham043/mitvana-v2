import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, ProductType, ProductListType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { ProductFormValuesType, ProductStatusFormValuesType } from "@/utils/data/schema/product";
import { formDataFromObject } from "@/utils/helper";

export const createProductHandler = async (val: ProductFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const formData = formDataFromObject(val);
    const response = await axios.post<{ data: ProductType }>(api_routes.products.create, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const updateProductHandler = async (id: string, val: ProductFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const formData = formDataFromObject(val);
    const response = await axios.put<{ data: ProductType }>(api_routes.products.update + `/${id}`, formData, { signal, headers: { "Content-Type": "multipart/form-data" } });
    return response.data.data;
}

export const deleteProductHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: ProductType }>(api_routes.products.delete + `/${id}`, { signal });
}

export const deleteProductImageHandler = async (id: string, imageId: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: ProductType }>(api_routes.products.delete + `/${id}/image/${imageId}`, { signal });
}

export const toggleProductStatusHandler = async (id: string, val: ProductStatusFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.patch<{ data: ProductType }>(api_routes.products.toggleStatus + `/${id}`, val, { signal });
    return response.data.data;
}

export const getProductHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProductType }>(api_routes.products.view + `/${id}`, { signal });
    return response.data.data;
}

export const getProductBySlugHandler = async (slug: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProductType }>(api_routes.products.viewBySlug + `/${slug}`, { signal });
    return response.data.data;
}

export const getProductsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ProductListType> }>(api_routes.products.paginate, { params, signal });
    return response.data.data;
}

export const getPublishedProductsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ProductListType> }>(api_routes.products.paginatePublished, { params, signal });
    return response.data.data;
}

export const getProductsExportHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get(api_routes.products.export, { params, signal, responseType: 'blob' });
    const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return blob;
}