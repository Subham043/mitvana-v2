import { useMutation } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/hooks/useToast";
import type { AddressFormValuesType } from "../schemas/address.schema";
import { createAddressServerFunc, deleteAddressServerFunc, updateAddressServerFunc } from "../server_functions/address.server_function";
import { AddressQueryKey } from "../queries/address.query";
import { apiResolver } from "../utils";

export const useAddressCreateMutation = () => {
    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await apiResolver(createAddressServerFunc({ data: val }));
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (___, _, __, context) => {
            context.client.invalidateQueries({ queryKey: AddressQueryKey() });
            toastSuccess("Address created successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const useAddressUpdateMutation = (id: string) => {
    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await apiResolver(updateAddressServerFunc({ data: { ...val, id } }));
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (___, _, __, context) => {
            context.client.invalidateQueries({ queryKey: AddressQueryKey() });
            toastSuccess("Address updated successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const useAddressDeleteMutation = (id: string) => {
    return useMutation({
        mutationFn: async () => {
            await apiResolver(deleteAddressServerFunc({ data: { id } }));
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (_, __, ___, context) => {
            context.client.invalidateQueries({ queryKey: AddressQueryKey() });
            toastSuccess("Address deleted successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};
