import { useOrderPlaceMutation } from "@/lib/data/mutations/orders";
import { PlaceOrderFormValuesType, placeOrderSchema } from "@/lib/data/schemas/order";
import { useCartStore } from "@/lib/store/cart.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";


export const useCheckout = () => {
    const cart = useCartStore(state => state.cart)
    const orderPlaceMutation = useOrderPlaceMutation();
    const form = useForm<PlaceOrderFormValuesType>({
        resolver: yupResolver(placeOrderSchema) as Resolver<PlaceOrderFormValuesType>,
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

    const onSubmit = useCallback((data: PlaceOrderFormValuesType) => {
        orderPlaceMutation.mutate(data);
    }, [orderPlaceMutation]);

    return {
        form,
        onSubmit
    };
};
