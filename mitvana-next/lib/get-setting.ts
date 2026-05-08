import { env } from "@/config/env";
import { api_routes } from "./constants/routes.option";
import type { SettingType } from "./types";

export async function getSetting() {

    const res = await fetch(`${env.API_ENDPOINT}${api_routes.setting.view}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) return {
        id: '',
        admin_email: 'info@matxinlabs.com',
        top_banner_text: '',
        min_cart_value_for_free_shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const data = await res.json() as { data: SettingType };

    return data.data;
}