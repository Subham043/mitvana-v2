import axios from "@/lib/axios";
import publicAxios from "axios";
import { api_routes } from "@/lib/constants/routes.option";
import type { ProfileType, TokenType } from "@/lib/types";
import type { GenericAbortSignal } from "axios";
import { axiosConfig } from "@/lib/constants/axios.option";
import type { ProfileUpdateFormValuesType } from "@/lib/data/schemas/profile";
import type { PasswordUpdateFormValuesType } from "@/lib/data/schemas/profile";
import type { VerifyAccountFormValuesType } from "@/lib/data/schemas/profile";

export const resendVerificationCodeHandler = async (signal?: GenericAbortSignal | undefined) => {
    await axios.get(api_routes.account.resend_verification_code, { signal });
}

export const updateProfileHandler = async (val: ProfileUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: ProfileType }>(api_routes.account.update, val, { signal });
    return response.data.data;
}

export const changePasswordHandler = async (val: PasswordUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.put(api_routes.account.update_password, val, { signal });
}

export const getProfileHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProfileType }>(api_routes.account.get, { signal });
    return response.data.data;
}

export const verifyProfileHandler = async (val: VerifyAccountFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.put(api_routes.account.verify, val, { signal });
}

export const logoutHandler = async (signal?: GenericAbortSignal | undefined) => {
    await axios.get(api_routes.account.logout, { signal });
}

export const refreshTokenHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await publicAxios.get<{ data: ProfileType & TokenType }>(api_routes.account.refresh, { ...axiosConfig, signal });
    return response.data.data;
}