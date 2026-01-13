import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../auth.types';
import { DatabaseService } from 'src/database/database.service';
import { users } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly repository: DatabaseService,
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
            const result = await this.repository.db.select({
                id: users.id,
                name: users.name,
                email: users.email,
                is_blocked: users.is_blocked,
                email_verified_at: users.email_verified_at,
            }).from(users).where(eq(users.id, payload.id)).limit(1);
            if (!result.length) throw new UnauthorizedException();
            const user = result[0];
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