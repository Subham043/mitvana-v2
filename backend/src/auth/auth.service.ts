import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AUTHENTICATION_REPOSITORY } from "src/authentication/auth.constants";
import { AuthenticationRepositoryInterface } from "src/authentication/interface/authentication.repository.interface";
import jwtConfig from "src/config/schema/jwt.config";
import { JwtPayload, Token } from "./auth.types";


@Injectable()
export class AuthService {

    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfigKey: ConfigType<typeof jwtConfig>,
        private jwtService: JwtService,
        @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface
    ) { }

    async generateAccessToken(jwtPayload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(jwtPayload, {
            secret: this.jwtConfigKey.secret,
            expiresIn: this.jwtConfigKey.expiry as unknown as number,
        });
    }

    async generateRefreshToken(jwtPayload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(jwtPayload, {
            secret: this.jwtConfigKey.refresh_secret,
            expiresIn: this.jwtConfigKey.refresh_expiry as unknown as number,
        });
    }

    async generateTokens(jwtPayload: JwtPayload): Promise<Token> {
        const [at, rt] = await Promise.all([
            this.generateAccessToken(jwtPayload),
            this.generateRefreshToken(jwtPayload),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async verifyUserById(id: string): Promise<JwtPayload> {
        const user = await this.authenticationRepository.getById(id);
        if (!user) throw new UnauthorizedException();
        if (user.is_blocked) throw new UnauthorizedException("Your account is blocked. Please contact support.");
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            is_blocked: user.is_blocked,
            is_admin: user.is_admin,
            is_verified: user.email_verified_at !== null,
        };
    }
}