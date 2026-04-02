import axios from "@/utils/axios";
import { api_routes } from "@/utils/routes/api_routes";
import type { PaginationType, PaymentListType } from "@/utils/types";
import type { GenericAbortSignal } from "axios";


export const getPaymentsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<PaymentListType> }>(api_routes.payments.paginate, { params, signal });
    return response.data.data;
}

export const getPaymentsExportHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get(api_routes.payments.export, { params, signal, responseType: 'blob' });
    const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return blob;
}