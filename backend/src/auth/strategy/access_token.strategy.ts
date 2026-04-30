import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AppConfigType } from 'src/config/schema';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService<AppConfigType>
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
        return await this.authService.verifyUserById(payload.id);
    }
}