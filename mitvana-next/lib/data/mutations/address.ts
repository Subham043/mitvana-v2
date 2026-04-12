import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AddressFormValuesType } from "../schemas/address";
import { createAddressHandler, deleteAddressHandler, updateAddressHandler } from "../dal/address";
import { AddressType, PaginationType } from "@/lib/types";
import { AddressesQueryKey, AddressQueryKey } from "../queries/address";

export const useAddressCreateMutation = () => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await createAddressHandler(val);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Address created successfully");
            context.client.invalidateQueries({ queryKey: AddressesQueryKey(params) });
        },
    });
};

export const useAddressUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async (val: AddressFormValuesType) => {
            return await updateAddressHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Address updated successfully");
            context.client.setQueryData(AddressesQueryKey(params), (oldData: PaginationType<AddressType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = data;
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(AddressQueryKey(id), data);
            context.client.setQueryData(AddressQueryKey(id, true), data);
        },
    });
};

export const useAddressDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const params = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            return await deleteAddressHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Address deleted successfully");
            context.client.invalidateQueries({ queryKey: AddressesQueryKey(params) });
            context.client.setQueryData(AddressQueryKey(id), undefined);
            context.client.setQueryData(AddressQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
    });
};