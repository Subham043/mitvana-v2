import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, CouponCodeType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCouponCodeByCodeHandler, getCouponCodeHandler, getCouponCodesHandler } from "../dal/coupon_codes";
import { useSearchParams } from "react-router";


export const CouponCodeQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["coupon_code", id, "edit"]
    }
    return ["coupon_code", id, "view"]
};

export const CouponCodeSlugQueryKey = (slug: string) => {
    return ["coupon_code", "slug", slug]
};

export const CouponCodesQueryKey = (params: URLSearchParams) => {
    return ["coupon_codes", params.toString()]
};

export const CouponCodeQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getCouponCodeHandler(id, signal);
}

export const CouponCodeSlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getCouponCodeByCodeHandler(slug, signal);
}

export const CouponCodesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getCouponCodesHandler(params, signal);
}

/*
  Coupon Code Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useCouponCodeQuery: (id: string, enabled: boolean) => UseQueryResult<
    CouponCodeType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: CouponCodeQueryKey(id),
        queryFn: ({ signal }) => CouponCodeQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Coupon Code Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useCouponCodeSlugQuery: (slug: string, enabled: boolean) => UseQueryResult<
    CouponCodeType | undefined,
    unknown
> = (slug, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: CouponCodeSlugQueryKey(slug),
        queryFn: ({ signal }) => CouponCodeSlugQueryFn({ slug, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Coupon Codes Query Hook Function: This hook is used to fetch information of all the coupon codes
*/
export const useCouponCodesQuery: () => UseQueryResult<
    PaginationType<CouponCodeType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: CouponCodesQueryKey(params),
        queryFn: ({ signal }) => CouponCodesQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};