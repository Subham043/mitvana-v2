import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { SettingType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { SettingFormValuesType } from "@/utils/data/schema/setting";

export const saveSettingsHandler = async (val: SettingFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: SettingType }>(api_routes.settings.save, val, { signal });
    return response.data.data;
}

export const getSettingsHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: SettingType }>(api_routes.settings.view, { signal });
    return response.data.data;
}