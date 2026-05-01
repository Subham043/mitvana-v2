import axios from "@/lib/axios";
import type { PaginationType, OrderInfoType, OrderListType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { PlaceOrderFormValuesType, ReasonStatusFormValuesType, VerifyOrderFormValuesType } from "../schemas/order";
import { api_routes } from "@/lib/constants/routes.option";


export const cancelOrderHandler = async (id: string, val: ReasonStatusFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.patch<{ data: OrderInfoType }>(api_routes.orders.cancel + `/${id}`, val, { signal });
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

export const getOrderPdfExportHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get(api_routes.orders.pdf + `/${id}`, { signal, responseType: 'blob' });

    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    let fileName = 'invoice.pdf';

    if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match?.[1]) {
            fileName = match[1];
        }
    }
    const blob = new Blob([response.data], {
        type: contentType,
    });
    return { blob, fileName };
}

export const placeOrderHandler = async (val: PlaceOrderFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{
        data: {
            amount: string | number;
            key: string;
            razorpay_order_id: string;
            currency: string;
            receipt?: string | undefined;
        }
    }>(api_routes.orders.place, val, { signal });
    return response.data.data;
}

export const verifyOrderHandler = async (val: VerifyOrderFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: OrderInfoType }>(api_routes.orders.verify, val, { signal });
    return response.data.data;
}