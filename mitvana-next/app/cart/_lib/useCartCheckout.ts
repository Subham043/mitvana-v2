import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const cartCheckoutSchema = yup
    .object({
        isChecked: yup
            .boolean()
            .oneOf([true], "Please accept the terms and conditions to checkout")
            .required("Please accept the terms and conditions to checkout"),
    })
    .required();

export type CartCheckoutFormValuesType = yup.InferType<
    typeof cartCheckoutSchema
>;

export const useCartCheckout = () => {
    const router = useRouter()

    const form = useForm<CartCheckoutFormValuesType>({
        resolver: yupResolver(cartCheckoutSchema),
        defaultValues: {
            isChecked: false,
        },
        mode: "onSubmit",
    });

    const onSubmit = useCallback(
        form.handleSubmit(() => {
            router.push("/checkout")
        }),
        [form.handleSubmit, router]
    );
    return {
        form,
        onSubmit
    };
};
