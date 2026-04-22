import { useOrderCancelMutation } from "@/lib/data/mutations/orders";
import { ReasonStatusFormValuesType, reasonStatusSchema } from "@/lib/data/schemas/order";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

type Props = {
    id: string
};

export function useOrderCancelForm({ id }: Props) {
    const orderCancelMutation = useOrderCancelMutation(id);
    const [modal, setModal] = useState<boolean>(false);

    const form = useForm<ReasonStatusFormValuesType>({
        resolver: yupResolver(reasonStatusSchema) as Resolver<ReasonStatusFormValuesType>,
        values: {
            cancellation_reason: ""
        },
    });

    const handleModalClose = useCallback(
        () => setModal(false),
        [],
    );

    const handleModalOpen = useCallback(() => {
        setModal(true);
    }, []);

    const onOpenChange = useCallback((val: boolean) => {
        if (!val) {
            form.reset({
                cancellation_reason: ""
            });
            handleModalClose();
        } else {
            handleModalOpen();
        }
    }, [handleModalClose, handleModalOpen, form]);

    const onSubmit = useCallback(
        form.handleSubmit(async (values) => {
            orderCancelMutation.mutateAsync(values, {
                onError: (error) => {
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    onOpenChange(false);
                },
            });
        }),
        [form.handleSubmit, orderCancelMutation.mutateAsync, onOpenChange]
    );

    return {
        form,
        modal,
        loading: orderCancelMutation.isPending,
        onSubmit,
        handleModalClose,
        handleModalOpen,
        onOpenChange
    };
}