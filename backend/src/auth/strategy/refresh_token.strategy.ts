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
        const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET_KEY');

        if (!jwtSecret) {
            throw new Error('JWT_REFRESH_SECRET_KEY is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
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