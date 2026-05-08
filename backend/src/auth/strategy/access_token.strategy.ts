import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AppConfigType } from 'src/config/schema';
import { HelperUtil } from 'src/utils/helper.util';
import { AUTH_CACHE_KEY } from 'src/api/authentication/auth.constants';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService<AppConfigType>,
        private readonly cacheService: CacheService,
    ) {
        const jwtSecret = configService.get('JWT_SECRET_KEY');
        const jwtIgnoreExpiration = configService.get('JWT_IGNORE_EXPIRATION') === 'true';

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: jwtIgnoreExpiration,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        const cacheKey = HelperUtil.generateCacheKey(AUTH_CACHE_KEY, { id: payload.id });

        return this.cacheService.wrap({
            key: cacheKey,
            callback: async () => {

                return await this.authService.verifyUserById(payload.id);
            },
            options: {
                tags: [AUTH_CACHE_KEY, cacheKey],
            },
        });

    }
}