import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET_KEY') as string;
        const jwtIgnoreExpiration = configService.get<string>('JWT_REFRESH_IGNORE_EXPIRATION') as string === 'true';

        super({
            jwtFromRequest: HelperUtil.jwtFromCookie,
            secretOrKey: jwtSecret,
            ignoreExpiration: jwtIgnoreExpiration,
            passReqToCallback: true,
        });
    }

    async validate(req: FastifyRequest, payload: JwtPayload): Promise<JwtRefreshPayload> {
        const refreshToken = HelperUtil.jwtFromCookie(req);

        if (!refreshToken) throw new UnauthorizedException();

        const user = await this.authService.verifyUserById(payload.id);
        return {
            ...user,
            refreshToken,
        }
    }
}