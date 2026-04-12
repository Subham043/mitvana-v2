import axios from "@/lib/axios";
import { GenericAbortSignal } from "axios";
import { SubscriptionFormValuesType } from "../schemas/subscription";
import { SubscriptionType } from "@/lib/types";
import { api_routes } from "@/lib/constants/routes.option";


export const createSubscriptionHandler = async (val: SubscriptionFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SubscriptionType }>(api_routes.subscription.create, val, { signal });
    return response.data.data;
}