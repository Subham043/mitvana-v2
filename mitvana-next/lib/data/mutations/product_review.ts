import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { ProductReviewFormValuesType } from "../schemas/product_review";
import { createProductReviewHandler } from "../dal/product_review";


export const useProductReviewCreateMutation = () => {
    const { toastSuccess, toastError } = useToast();
    return useMutation({
        mutationFn: async (val: ProductReviewFormValuesType & { productId: string }) => {
            const { productId, ...rest } = val;
            return await createProductReviewHandler(rest, productId);
        },
        onSuccess: () => {
            toastSuccess(`Review submitted successfully`);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        }
    });
};