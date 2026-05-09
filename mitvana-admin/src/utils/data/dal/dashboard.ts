import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { DashboardType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const getDashboardHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: DashboardType }>(api_routes.dashboard.stats, { signal });
    return response.data.data;
}