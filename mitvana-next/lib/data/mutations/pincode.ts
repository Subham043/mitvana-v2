import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { PincodeFormValuesType } from "../schemas/pincode";
import { checkPincodeHandler } from "../dal/pincode";


export const usePincodeCheckMutation = () => {
    const { toastSuccess, toastError } = useToast();
    return useMutation({
        mutationFn: async (val: PincodeFormValuesType) => {
            return await checkPincodeHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data) => {
            if (data.is_delivery_available) {
                toastSuccess(`Delivery available at ${data.pincode}`);
            } else {
                toastError(`Delivery not available at ${data.pincode}`);
            }
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};