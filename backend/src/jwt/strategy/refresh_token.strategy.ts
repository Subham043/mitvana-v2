import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AUTHENTICATION_REPOSITORY } from 'src/authentication/auth.constants';
import { AuthenticationRepositoryInterface } from 'src/authentication/interface/authentication.repository.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface,
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
        try {
            const user = await this.authenticationRepository.getById(payload.id);
            if (!user) throw new UnauthorizedException();
            if (user.is_blocked) throw new UnauthorizedException();
            if (!user.email_verified_at) throw new UnauthorizedException();
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                is_blocked: user.is_blocked,
                is_verified: user.email_verified_at !== null,
                role: "USER",
                refreshToken: refreshToken || '',
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}