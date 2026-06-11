import { getHeroImagesHandler } from "../dal/hero_images";
import { queryOptions, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { HeroImageType } from "@/lib/types";


export const HeroImagesQueryKey = () => {
    return ["hero-images"]
};

export const HeroImagesQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    return await getHeroImagesHandler(signal);
}


export const HeroImagesQueryOptions = () => queryOptions({
    queryKey: HeroImagesQueryKey(),
    queryFn: ({ signal }) =>
        HeroImagesQueryFn({
            signal,
        }),
})

export const useHeroImagesQuery: () => UseQueryResult<
    HeroImageType[] | undefined,
    unknown
> = () => {
    return useQuery({
        ...HeroImagesQueryOptions(),
    });
};