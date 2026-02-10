import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { SettingFormValuesType } from "../schema/setting";
import { saveSettingsHandler } from "../dal/settings";
import { SettingQueryKey } from "../query/setting";

function removeUndefined<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== "")
    ) as Partial<T>;
}

export const useSettingsUpdateMutation = () => {
    const { toastSuccess } = useToast();

    return useMutation({
        mutationFn: async (val: SettingFormValuesType) => {
            nprogress.start()
            const values = removeUndefined(val);
            return await saveSettingsHandler(values);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Settings updated successfully");
            context.client.setQueryData(SettingQueryKey(), data);
            context.client.setQueryData(SettingQueryKey(true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};