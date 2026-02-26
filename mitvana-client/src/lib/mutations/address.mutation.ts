import { useMutation } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/hooks/useToast";
import type { AddressFormValuesType } from "../schemas/address.schema";
import { createAddressServerFunc, deleteAddressServerFunc, updateAddressServerFunc } from "../server_functions/address.server_function";
import { AddressQueryKey } from "../queries/address.query";
import type { AddressType } from "../type";

export const useAddressCreateMutation = () => {
    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await createAddressServerFunc({ data: val });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (data, _, __, context) => {
            context.client.setQueryData(AddressQueryKey(), (oldData: AddressType[] | undefined) => {
                if (!oldData) return oldData;
                return data;
            });
            toastSuccess("Address created successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const useAddressUpdateMutation = (_id: string) => {
    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await updateAddressServerFunc({ data: { ...val, _id } });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (data, _, __, context) => {
            context.client.setQueryData(AddressQueryKey(), (oldData: AddressType[] | undefined) => {
                if (!oldData) return oldData;
                return data;
            });
            toastSuccess("Address updated successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const useAddressDeleteMutation = (_id: string) => {
    return useMutation({
        mutationFn: async () => {
            await deleteAddressServerFunc({ data: { _id } });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (_, __, ___, context) => {
            context.client.setQueryData(AddressQueryKey(), (oldData: AddressType[] | undefined) => {
                if (!oldData) return oldData;
                const newData = [...oldData];
                return newData.filter(item => item._id !== _id);
            });
            toastSuccess("Address updated successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};
