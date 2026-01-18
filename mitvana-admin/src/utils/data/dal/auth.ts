import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { AuthType, TokenType } from "../../types";
import type { ForgotPasswordFormValuesType } from "@/pages/Auth/ForgotPassword/schema";
import type { ResetPasswordFormValuesType } from "@/pages/Auth/ResetPassword/schema";
import type { LoginFormValuesType } from "@/pages/Auth/Login/schema";
import type { GenericAbortSignal } from "axios";

export const loginHandler = async (val: LoginFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<AuthType & TokenType>(
        api_routes.auth.login,
        val,
        { signal }
    );
    return response.data;
}

export const forgotPasswordHandler = async (val: ForgotPasswordFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(
        api_routes.auth.forgotPassword,
        val,
        { signal }
    );
}

export const resetPasswordHandler = async (token: string, val: ResetPasswordFormValuesType, signal?: GenericAbortSignal | undefined) => {
    await axios.post(
        `${api_routes.auth.resetPassword}/${token}`,
        val,
        { signal }
    );
}
