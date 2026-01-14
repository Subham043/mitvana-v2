import { JwtPayload, Token } from "src/auth/auth.types";
import { LoginDto } from "../schema/login.schema";
import { RegisterDto } from "../schema/register.schema";

export interface AuthenticationServiceInterface {
    login(loginDto: LoginDto): Promise<JwtPayload & Token>;
    register(registerDto: RegisterDto): Promise<JwtPayload & Token>;
}