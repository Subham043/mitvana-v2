import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.types';
import { DatabaseService } from 'src/database/database.service';
import { eq } from 'drizzle-orm';
import { users } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly repository: DatabaseService,
        configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET_KEY');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
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
                role: "USER"
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}