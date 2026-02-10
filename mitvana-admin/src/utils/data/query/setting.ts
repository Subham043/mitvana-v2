import { useAuthStore } from "@/stores/auth.store";
import type { SettingType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSettingsHandler } from "../dal/settings";


export const SettingQueryKey = (isEdit: boolean = false) => {
    if (isEdit) {
        return ["setting", "edit"]
    }
    return ["setting", "view"]
};

export const SettingQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    return await getSettingsHandler(signal);
}

/*
  Setting Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useSettingQuery: (enabled: boolean) => UseQueryResult<
    SettingType | undefined,
    unknown
> = (enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: SettingQueryKey(),
        queryFn: ({ signal }) => SettingQueryFn({ signal }),
        enabled: authToken !== null && enabled,
    });
};