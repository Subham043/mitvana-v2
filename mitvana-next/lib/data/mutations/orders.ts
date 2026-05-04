import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PaymentCancelledOrderFormValuesType, PaymentFailedOrderFormValuesType, PlaceOrderFormValuesType, ReasonStatusFormValuesType, VerifyOrderFormValuesType } from "../schemas/order";
import { cancelOrderHandler, getOrderPdfExportHandler, paymentCancelledOrderHandler, paymentFailedOrderHandler, placeOrderHandler, verifyOrderHandler } from "../dal/orders";
import { OrderQueryKey, OrdersQueryKey } from "../queries/order";
import { loadRazorpayScript } from "@/lib/helper";
import { env } from "@/config/env";
import { useAuthStore } from "@/lib/store/auth.store";
import { isAxiosError } from "axios";
import { useCartStore } from "@/lib/store/cart.store";
import { CartNewQueryKey } from "../queries/cart";

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

export const usePaymentFailedOrderMutation = () => {
    const { toastSuccess, toastError } = useToast();

    return useMutation({
        mutationFn: async (val: PaymentFailedOrderFormValuesType) => {
            return await paymentFailedOrderHandler(val);
        },
        onSuccess: () => {
            toastSuccess("Payment failed");
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
    });
};

export const usePaymentCancelledOrderMutation = () => {
    const { toastSuccess, toastError } = useToast();

    return useMutation({
        mutationFn: async (val: PaymentCancelledOrderFormValuesType) => {
            return await paymentCancelledOrderHandler(val);
        },
        onSuccess: () => {
            toastSuccess("Payment cancelled");
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
            const cartProducts = useCartStore.getState().cartProducts();

            // Here you can check stock
            const stock = cartProducts.map((cartProduct) => ({
                product_id: cartProduct.product.id,
                product_title: cartProduct.product.title,
                quantity: cartProduct.quantity,
                stock: cartProduct.product.stock,

            }));

            const outOfStockProducts = stock.filter((s) => s.quantity > s.stock);
            if (outOfStockProducts.length > 0) {
                throw new Error(`"${outOfStockProducts.map((s) => s.product_title).join(", ")}" ${outOfStockProducts.length > 1 ? "are" : "is"} out of stock`);
            }

            const data = await placeOrderHandler({
                ...val,
                order_items: stock.map((s) => ({
                    product_id: s.product_id,
                    quantity: s.quantity,
                }))
            });
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
                        ondismiss: async () => {
                            done(async () => {
                                try {
                                    await paymentCancelledOrderHandler({
                                        razorpay_order_id: data.razorpay_order_id,
                                        order_id: data.order_id,
                                    });
                                    reject(new Error("Payment Cancelled"))
                                } catch (err) {
                                    reject(err)
                                }
                            });
                        }
                    },
                    retry: {
                        enabled: false,
                        max_attempts: 0,
                    },

                    handler: async (response: VerifyOrderFormValuesType) => {
                        try {
                            const result = await verifyOrderHandler({ ...response, order_id: data.order_id });
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

                rzp.on("payment.failed", async function (response: { error: { description: string; metadata: { order_id: string; payment_id: string } } }) {
                    done(async () => {
                        try {
                            await paymentFailedOrderHandler({
                                razorpay_order_id: response.error.metadata.order_id,
                                razorpay_payment_id: response.error.metadata.payment_id,
                                order_id: data.order_id,
                            });
                            reject(new Error(response.error.description))
                        } catch (err) {
                            reject(err);
                        }
                    });
                });

                rzp.open();
            }) as Promise<{ is_paid: boolean; order_id: string }>;
        },
        onSuccess: async (data, __, ___, context) => {
            toastSuccess("Order placed successfully");
            if (data.is_paid) {
                useCartStore.getState().clearCart();
                context.client.setQueryData(CartNewQueryKey(), () => null);
            }
        },
        onError: (error: any, _, __, context) => {
            if (isAxiosError(error)) {
                if (error?.response?.status === 400 && error?.response?.data?.message === "Some products are out of stock") {
                    context.client.invalidateQueries({ queryKey: CartNewQueryKey() });
                }
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