import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

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
        const jwtIgnoreExpiration = configService.get<boolean>('JWT_REFRESH_IGNORE_EXPIRATION') as boolean;

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            ignoreExpiration: jwtIgnoreExpiration,
            passReqToCallback: true,
        });
    }

    async validate(req: FastifyRequest, payload: JwtPayload): Promise<JwtRefreshPayload> {
        const refreshToken = req.headers.authorization?.replace('Bearer', '').trim();
        const user = await this.authService.verifyUserById(payload.id);
        return {
            ...user,
            refreshToken: refreshToken || '',
        }
    }
}