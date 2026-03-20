import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { deleteProductReviewHandler, updateProductReviewStatusHandler } from "../dal/product_reviews";
import { nprogress } from "@mantine/nprogress";
import type { PaginationType, ProductReviewType } from "@/utils/types";
import { ProductReviewQueryKey, ProductReviewsQueryKey } from "../query/product_review";

export const useProductReviewDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteProductReviewHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Product review deleted successfully");
            context.client.invalidateQueries({ queryKey: ProductReviewsQueryKey(params) });
            context.client.setQueryData(ProductReviewQueryKey(id), undefined);
            context.client.setQueryData(ProductReviewQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useProductReviewToggleStatusMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: { status: "pending" | "approved" | "rejected" }) => {
            nprogress.start()
            return await updateProductReviewStatusHandler(id, val);
        },
        onSuccess: (data, variables, ___, context) => {
            toastSuccess(`Product review ${variables.status} successfully`);
            context.client.setQueryData(ProductReviewsQueryKey(params), (oldData: PaginationType<ProductReviewType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((review) => review.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = {
                        ...data,
                        product: {
                            ...data.product,
                            thumbnail_link: `${data.product.thumbnail_link}?v=${new Date(data.updatedAt).getTime()}`,
                        }
                    };
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(ProductReviewQueryKey(id), data);
            context.client.setQueryData(ProductReviewQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};