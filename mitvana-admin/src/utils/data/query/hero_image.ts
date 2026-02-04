import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, HeroImageType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getHeroImageHandler, getHeroImagesHandler } from "../dal/hero_images";
import { useSearchParams } from "react-router";


export const HeroImageQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["hero_image", id, "edit"]
    }
    return ["hero_image", id, "view"]
};

export const HeroImagesQueryKey = (params: URLSearchParams) => {
    return ["hero_images", params.toString()]
};

export const HeroImageQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getHeroImageHandler(id, signal);
}

export const HeroImagesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getHeroImagesHandler(params, signal);
}

/*
  Hero Image Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useHeroImageQuery: (id: string, enabled: boolean) => UseQueryResult<
    HeroImageType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: HeroImageQueryKey(id),
        queryFn: ({ signal }) => HeroImageQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Hero Images Query Hook Function: This hook is used to fetch information of all the hero images
*/
export const useHeroImagesQuery: () => UseQueryResult<
    PaginationType<HeroImageType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: HeroImagesQueryKey(params),
        queryFn: ({ signal }) => HeroImagesQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};