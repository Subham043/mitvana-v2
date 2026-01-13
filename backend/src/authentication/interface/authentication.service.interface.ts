import { JwtPayload, Token } from "src/jwt/auth.types";
import { LoginDto } from "../schema/login.schema";
import { RegisterDto } from "../schema/register.schema";

export interface AuthenticationServiceInterface {
    generateTokens(jwtPayload: JwtPayload): Promise<Token>;
    login(loginDto: LoginDto): Promise<JwtPayload & Token>;
    register(registerDto: RegisterDto): Promise<JwtPayload & Token>;
}