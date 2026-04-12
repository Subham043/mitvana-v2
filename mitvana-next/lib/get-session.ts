import { env } from "@/config/env";
import { cookies } from "next/headers";
import { api_routes } from "./constants/routes.option";
import type { ProfileType, TokenType } from "./types";

export async function getSession() {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_ENDPOINT}${api_routes.account.refresh}`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json() as { data: ProfileType & TokenType };

    return data.data;
}