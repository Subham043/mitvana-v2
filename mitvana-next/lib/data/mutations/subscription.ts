import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { SubscriptionFormValuesType } from "../schemas/subscription";
import { createSubscriptionHandler } from "../dal/subscription";


export const useSubscribeMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: SubscriptionFormValuesType) => {
            return await createSubscriptionHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toastSuccess("Subscribed successfully");
        },
    });
};