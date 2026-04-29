import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { ProductNotifyFormValuesType } from "../schemas/product_notify";
import { createProductNotifyHandler } from "../dal/product_notify";


export const useProductNotifyCreateMutation = () => {
    const { toastSuccess, toastError } = useToast();
    return useMutation({
        mutationFn: async (val: ProductNotifyFormValuesType & { productId: string }) => {
            const { productId, ...rest } = val;
            return await createProductNotifyHandler(rest, productId);
        },
        onSuccess: () => {
            toastSuccess(`You will be notified when this product is back in stock`);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        }
    });
};