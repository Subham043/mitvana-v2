import { useAddressCreateMutation, useAddressUpdateMutation } from "@/lib/data/mutations/address";
import { useAddressQuery } from "@/lib/data/queries/address";
import { addressSchema, AddressFormValuesType } from "@/lib/data/schemas/address";
import { handleFormServerErrors } from "@/lib/helper";
import { ExtendedModalProps } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { Resolver, useForm } from "react-hook-form";

type Props = {
    modal: ExtendedModalProps<{ id: string }>;
    closeModal: () => void;
};

const addressFormDefaultValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    city: "",
    state: "",
    postal_code: 0,
    address: "",
    address_2: "",
    company_name: "",
    address_type: "Home" as "Home" | "Work",
}

export function useAddressForm({ modal, closeModal }: Props) {
    const { data, isLoading } = useAddressQuery(modal.type === "update" && modal.show ? modal.id : "", modal.type === "update" && modal.show)
    const addressCreateMutation = useAddressCreateMutation()
    const addressUpdateMutation = useAddressUpdateMutation(modal.type === "update" && modal.show ? modal.id : "")

    const form = useForm<AddressFormValuesType>({
        resolver: yupResolver(addressSchema) as Resolver<AddressFormValuesType>,
        values: {
            first_name: modal.type === "update" && modal.show && data && data.first_name ? data.first_name : "",
            last_name: modal.type === "update" && modal.show && data && data.last_name ? data.last_name : "",
            phone_number: modal.type === "update" && modal.show && data && data.phone_number ? data.phone_number : "",
            country: modal.type === "update" && modal.show && data && data.country ? data.country : "",
            city: modal.type === "update" && modal.show && data && data.city ? data.city : "",
            state: modal.type === "update" && modal.show && data && data.state ? data.state : "",
            postal_code: modal.type === "update" && modal.show && data && data.postal_code ? data.postal_code : 0,
            address: modal.type === "update" && modal.show && data && data.address ? data.address : "",
            address_2: modal.type === "update" && modal.show && data && data.address_2 ? data.address_2 : "",
            company_name: modal.type === "update" && modal.show && data && data.company_name ? data.company_name : "",
            address_type: modal.type === "update" && modal.show && data && data.address_type ? data.address_type as "Home" | "Work" : "Home",
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit(async (values) => {
            if (modal.type === "update") {
                addressUpdateMutation.mutateAsync(values, {
                    onError: (error) => {
                        handleFormServerErrors(error, form);
                    },
                    onSuccess: (values) => {
                        form.reset({
                            first_name: values.first_name !== null ? values.first_name : "",
                            last_name: values.last_name !== null ? values.last_name : "",
                            phone_number: values.phone_number !== null ? values.phone_number : "",
                            country: values.country !== null ? values.country : "",
                            city: values.city !== null ? values.city : "",
                            state: values.state !== null ? values.state : "",
                            postal_code: values.postal_code !== null ? values.postal_code : 0,
                            address: values.address !== null ? values.address : "",
                            address_2: values.address_2 !== null ? values.address_2 : "",
                            company_name: values.company_name !== null ? values.company_name : "",
                            address_type: values.address_type !== null ? values.address_type as "Home" | "Work" : "Home",
                        });
                        closeModal();
                    },
                });
            } else {
                addressCreateMutation.mutateAsync(values, {
                    onError: (error) => {
                        handleFormServerErrors(error, form);
                    },
                    onSuccess: () => {
                        form.reset(addressFormDefaultValues);
                        closeModal();
                    },
                });
            }
        }),
        [form.handleSubmit, addressCreateMutation.mutateAsync, addressUpdateMutation.mutateAsync, modal.type]
    );

    return {
        form,
        isLoading,
        loading: addressCreateMutation.isPending || addressUpdateMutation.isPending,
        onSubmit,
    };
}