import { useToast } from "@/hooks/useToast";
import { useCartStore } from "@/lib/store/cart.store";
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
    const { toastError } = useToast();

    const form = useForm<CartCheckoutFormValuesType>({
        resolver: yupResolver(cartCheckoutSchema),
        defaultValues: {
            isChecked: false,
        },
        mode: "onSubmit",
    });

    const onSubmit = useCallback(
        form.handleSubmit(() => {
            const cartProducts = useCartStore.getState().cartProducts();

            const stock = cartProducts.map((cartProduct) => ({
                product_title: cartProduct.product.title,
                quantity: cartProduct.quantity,
                stock: cartProduct.product.stock,
            }));

            const outOfStockProducts = stock.filter((s) => s.quantity > s.stock);
            if (outOfStockProducts.length > 0) {
                toastError(`"${outOfStockProducts.map((s) => s.product_title).join(", ")}" ${outOfStockProducts.length > 1 ? "are" : "is"} out of stock`);
                return;
            }
            router.push("/checkout")
        }),
        [form.handleSubmit, router]
    );
    return {
        form,
        onSubmit
    };
};
