import { useCartStore } from "@/lib/store/cart.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

const checkoutSchema = yup
    .object({
        address_id: yup.string().required("Please select an address"),
        order_note: yup.string().optional(),
        isChecked: yup
            .boolean()
            .oneOf([true], "Please accept the terms and conditions to checkout")
            .required("Please accept the terms and conditions to checkout"),
    })
    .required();

export type CheckoutFormValuesType = yup.InferType<
    typeof checkoutSchema
>;

export const useCheckout = () => {
    const cart = useCartStore(state => state.cart)
    const form = useForm<CheckoutFormValuesType>({
        resolver: yupResolver(checkoutSchema) as Resolver<CheckoutFormValuesType>,
        defaultValues: {
            isChecked: false,
            address_id: cart && cart.address ? cart.address.id : "",
            order_note: ""
        },
    });

    useEffect(() => {
        if (cart && cart.address) {
            form.setValue("address_id", cart.address.id, { shouldValidate: true });
        }

        return () => {
            form.reset();
        }
    }, [cart?.address?.id, form.setValue, form.reset]);

    const onSubmit = useCallback((data: CheckoutFormValuesType) => {
        console.log(data);
    }, []);

    return {
        form,
        onSubmit
    };
};
