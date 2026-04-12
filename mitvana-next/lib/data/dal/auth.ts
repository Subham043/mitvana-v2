import axios from "@/lib/axios";
import type { AuthType, TokenType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { LoginFormValuesType, RegisterFormValuesType } from "@/lib/data/schemas/auth";
import type { ForgotPasswordFormValuesType } from "@/lib/data/schemas/auth";
import type { ResetPasswordFormValuesType } from "@/lib/data/schemas/auth";
import { api_routes } from "@/lib/constants/routes.option";

export const loginHandler = async (val: LoginFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: AuthType & TokenType }>(api_routes.auth.login, val, { signal });
    return response.data.data;
}

export const registerHandler = async (val: RegisterFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: AuthType & TokenType }>(api_routes.auth.register, val, { signal });
    return response.data.data;
}

export const forgotPasswordHandler = async (val: ForgotPasswordFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(
        api_routes.auth.forgot_password,
        val,
        { signal }
    );
}

export const resetPasswordHandler = async (token: string, val: ResetPasswordFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(
        `${api_routes.auth.reset_password}/${token}`,
        val,
        { signal }
    );
}
