import axios from "@/lib/axios";
import { GenericAbortSignal } from "axios";
import type { HeroImageType } from "@/lib/types";
import { api_routes } from "@/lib/constants/routes.option";


export const getHeroImagesHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: HeroImageType[] }>(api_routes.heroImage.all, { signal });
    return response.data.data;
}