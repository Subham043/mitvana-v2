import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PlaceOrderFormValuesType, ReasonStatusFormValuesType, VerifyOrderFormValuesType } from "../schemas/order";
import { cancelOrderHandler, getOrderPdfExportHandler, placeOrderHandler, verifyOrderHandler } from "../dal/orders";
import { OrderQueryKey, OrdersQueryKey } from "../queries/order";
import { loadRazorpayScript } from "@/lib/helper";
import { env } from "@/config/env";
import { useAuthStore } from "@/lib/store/auth.store";
import { OrderInfoType } from "@/lib/types";
import { isAxiosError } from "axios";

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

export const useOrderVerifyMutation = () => {
    const { toastSuccess, toastError } = useToast();

    return useMutation({
        mutationFn: async (val: VerifyOrderFormValuesType) => {
            return await verifyOrderHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Order verified successfully");
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
    });
};

export const useOrderPlaceMutation = () => {
    const { toastError, toastSuccess } = useToast();

    return useMutation({
        mutationFn: async (val: PlaceOrderFormValuesType) => {
            const data = await placeOrderHandler(val);
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                throw new Error("Failed to load Razorpay SDK");
            }
            return new Promise(async (resolve, reject) => {
                let isHandled = false; // 👈 guard

                const done = (fn: () => void) => {
                    if (isHandled) return;
                    isHandled = true;
                    fn();
                };

                const options: any = {
                    key: data.key,
                    amount: data.amount,
                    currency: data.currency,
                    order_id: data.razorpay_order_id,
                    name: "Mitvana",
                    image: `${env.APP_ENDPOINT}/logo.jpg`,
                    theme: {
                        color: "#000000"
                    },
                    modal: {
                        backdropclose: false,
                        escape: false,
                        handleback: true,
                        confirm_close: true,
                        ondismiss: () => {
                            done(() => reject(new Error("Payment Cancelled")));
                        }
                    },
                    retry: {
                        enabled: false,
                        max_attempts: 0,
                    },

                    handler: async (response: VerifyOrderFormValuesType) => {
                        try {
                            const result = await verifyOrderHandler(response);
                            done(() => resolve(result)); // ✅ success ends mutation
                        } catch (err) {
                            done(() => reject(err));
                        }
                    },
                };

                const authUser = useAuthStore.getState().authUser;

                if (authUser) {
                    options.prefill = {
                        name: authUser.name,
                        email: authUser.email,
                        contact: authUser.phone,
                    };
                }

                const rzp = new window.Razorpay(options);

                rzp.on("payment.failed", function (response: { error: { description: string; meta: { order_id: string; payment_id: string } } }) {
                    done(() =>
                        reject(new Error(response.error.description))
                    );
                });

                rzp.open();
            }) as Promise<OrderInfoType>;
        },
        onSuccess: async (data, __, ___, _) => {
            toastSuccess("Order placed successfully");
        },
        onError: (error: any) => {
            if (isAxiosError(error)) {
                toastError(error?.response?.data?.message);
            } else {
                toastError(error.message || "Something went wrong, please try again later.");
            }
        },
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