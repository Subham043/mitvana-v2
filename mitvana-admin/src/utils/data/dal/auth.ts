import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { AuthType, TokenType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { LoginFormValuesType } from "@/utils/data/schema/auth";
import type { ForgotPasswordFormValuesType } from "@/utils/data/schema/auth";
import type { ResetPasswordFormValuesType } from "@/utils/data/schema/auth";

export const loginHandler = async (val: LoginFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: AuthType & TokenType }>(api_routes.auth.login, val, { signal });
    return response.data.data;
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
