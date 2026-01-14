import { JwtPayload, Token } from "src/auth/auth.types";
import { LoginDto } from "../schema/login.schema";
import { RegisterDto } from "../schema/register.schema";
import { ForgotPasswordDto } from "../schema/forgot_password.schema";
import { ResetPasswordDto } from "../schema/reset_password.schema";

export interface AuthenticationServiceInterface {
    login(loginDto: LoginDto): Promise<JwtPayload & Token>;
    register(registerDto: RegisterDto): Promise<JwtPayload & Token>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resetPassword(token: string, dto: ResetPasswordDto): Promise<void>;
}