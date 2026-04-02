import { useToast } from "@/hooks/useToast";
import { nprogress } from "@mantine/nprogress";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getPaymentsExportHandler } from "../dal/payments";


export const usePaymentsExportMutation = () => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await getPaymentsExportHandler(params);
        },
        onSuccess: (data) => {
            toastSuccess("Payments exported successfully");
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "payments.xlsx");
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