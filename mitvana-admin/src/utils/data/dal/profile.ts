import axios from "@/utils/axios";
import publicAxios from "axios";
import { axiosConfig } from "@/utils/constants/axios";
import { api_routes } from "../../routes/api_routes";
import type { ProfileUpdateFormValuesType } from "@/pages/Profile/Account/schema";
import type { ProfileType, TokenType } from "../../types";
import type { PasswordUpdateFormValuesType } from "@/pages/Profile/Password/schema";
import type { GenericAbortSignal } from "axios";

export const resendVerificationCodeHandler = async (signal?: GenericAbortSignal | undefined) => {
    await axios.get(api_routes.profile.resendVerificationCode, { signal });
}

export const updateProfileHandler = async (val: ProfileUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: ProfileType }>(api_routes.profile.update, val, { signal });
    return response.data.data;
}

export const changePasswordHandler = async (val: PasswordUpdateFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.put(api_routes.profile.updatePassword, val, { signal });
}

export const getProfileHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProfileType }>(api_routes.profile.get, { signal });
    return response.data.data;
}

export const verifyProfileHandler = async (val: { code: string }, signal?: GenericAbortSignal | undefined) => {
    await axios.put(api_routes.profile.verify, val, { signal });
}

export const logoutHandler = async (signal?: GenericAbortSignal | undefined) => {
    await axios.get(api_routes.profile.logout, { signal });
}

export const refreshTokenHandler = async (signal?: GenericAbortSignal | undefined) => {
    const response = await publicAxios.get<{ data: ProfileType & TokenType }>(api_routes.profile.refresh, { ...axiosConfig, signal });
    return response.data.data;
}