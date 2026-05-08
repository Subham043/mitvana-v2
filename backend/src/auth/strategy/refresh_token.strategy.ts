import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { HelperUtil } from 'src/utils/helper.util';
import { AppConfigType } from 'src/config/schema';
import { AUTH_CACHE_KEY } from 'src/api/authentication/auth.constants';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService<AppConfigType>,
        private readonly cacheService: CacheService,
    ) {
        const jwtSecret = configService.get('JWT_REFRESH_SECRET_KEY');
        const jwtIgnoreExpiration = configService.get('JWT_REFRESH_IGNORE_EXPIRATION') === 'true';

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

        const cacheKey = HelperUtil.generateCacheKey(AUTH_CACHE_KEY, { id: payload.id });

        const user = await this.cacheService.wrap({
            key: cacheKey,
            callback: async () => {

                return await this.authService.verifyUserById(payload.id);
            },
            options: {
                tags: [AUTH_CACHE_KEY, cacheKey],
            },
        });

        return {
            ...user,
            refreshToken,
        }
    }
}