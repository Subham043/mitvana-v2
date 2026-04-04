import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, OrderInfoType, OrderListType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { OrderStatusFormValuesType } from "@/utils/data/schema/order";


export const toggleOrderStatusHandler = async (id: string, val: OrderStatusFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.patch<{ data: OrderInfoType }>(api_routes.orders.updateStatus + `/${id}`, val, { signal });
    return response.data.data;
}

export const getOrderHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: OrderInfoType }>(api_routes.orders.view + `/${id}`, { signal });
    return response.data.data;
}

export const getOrdersHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<OrderListType> }>(api_routes.orders.paginate, { params, signal });
    return response.data.data;
}

export const getOrdersExportHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get(api_routes.orders.export, { params, signal, responseType: 'blob' });
    const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return blob;
}

export const getOrderPdfExportHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get(api_routes.orders.pdf + `/${id}`, { signal, responseType: 'blob' });
    const blob = new Blob([response.data], {
        type: "application/pdf",
    });
    return blob;
}