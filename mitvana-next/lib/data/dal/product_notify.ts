import axios from "@/lib/axios";
import type { GenericAbortSignal } from "axios";
import type { ProductNotifyFormValuesType } from "@/lib/data/schemas/product_notify";
import { api_routes } from "@/lib/constants/routes.option";

export const createProductNotifyHandler = async (val: ProductNotifyFormValuesType, productId: string, signal?: GenericAbortSignal | undefined) => {
    await axios.post(api_routes.product.notify.create, { ...val, product_id: productId }, { signal });
}