import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, CouponCodeType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { CouponCodeFormValuesType } from "@/utils/data/schema/coupon_code";
import dayjs from "dayjs";

export const createCouponCodeHandler = async (val: CouponCodeFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const { expiration_date, ...rest } = val;
    const response = await axios.post<{ data: CouponCodeType }>(api_routes.couponCodes.create, { ...rest, expiration_date: dayjs(expiration_date).format("YYYY-MM-DD") }, { signal });
    return response.data.data;
}

export const updateCouponCodeHandler = async (id: string, val: CouponCodeFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const { expiration_date, ...rest } = val;
    const response = await axios.put<{ data: CouponCodeType }>(api_routes.couponCodes.update + `/${id}`, { ...rest, expiration_date: dayjs(expiration_date).format("YYYY-MM-DD") }, { signal });
    return response.data.data;
}

export const deleteCouponCodeHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: CouponCodeType }>(api_routes.couponCodes.delete + `/${id}`, { signal });
}

export const getCouponCodeHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CouponCodeType }>(api_routes.couponCodes.view + `/${id}`, { signal });
    return response.data.data;
}

export const getCouponCodeByCodeHandler = async (code: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: CouponCodeType }>(api_routes.couponCodes.viewByCode + `/${code}`, { signal });
    return response.data.data;
}

export const getCouponCodesHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<CouponCodeType> }>(api_routes.couponCodes.paginate, { params, signal });
    return response.data.data;
}