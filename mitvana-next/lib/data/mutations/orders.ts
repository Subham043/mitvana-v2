import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReasonStatusFormValuesType } from "../schemas/order";
import { cancelOrderHandler, getOrderPdfExportHandler } from "../dal/orders";
import { OrderQueryKey, OrdersQueryKey } from "../queries/order";

export const useOrderCancelMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async (val: ReasonStatusFormValuesType) => {
            return await cancelOrderHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Order cancelled successfully");
            context.client.invalidateQueries({ queryKey: OrdersQueryKey(params) });
            context.client.setQueryData(OrderQueryKey(id), data);
            context.client.setQueryData(OrderQueryKey(id, true), data);
        }
    });
};

export const useOrderPdfExportMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();

    return useMutation({
        mutationFn: async () => {
            return await getOrderPdfExportHandler(id);
        },
        onSuccess: (data) => {
            toastSuccess("Order exported successfully");
            const url = window.URL.createObjectURL(data.blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", data.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
    });
};