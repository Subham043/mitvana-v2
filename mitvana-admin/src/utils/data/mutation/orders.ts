import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { OrderListType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { OrderStatusFormValuesType } from "../schema/order";
import { getOrderPdfExportHandler, getOrdersExportHandler, toggleOrderStatusHandler } from "../dal/orders";
import { OrdersQueryKey, OrderQueryKey } from "../query/order";

export const useOrderToggleStatusMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: OrderStatusFormValuesType) => {
            nprogress.start()
            return await toggleOrderStatusHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Order status toggled successfully");
            context.client.setQueryData(OrdersQueryKey(params), (oldData: PaginationType<OrderListType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = data;
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(OrderQueryKey(id), data);
            context.client.setQueryData(OrderQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useOrdersExportMutation = () => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await getOrdersExportHandler(params);
        },
        onSuccess: (data) => {
            toastSuccess("Orders exported successfully");
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "orders.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useOrderPdfExportMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
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
        onSettled: () => {
            nprogress.complete();
        }
    });
};