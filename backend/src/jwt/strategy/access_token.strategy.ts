import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.types';
import { ConfigService } from '@nestjs/config';
import { AUTHENTICATION_REPOSITORY } from 'src/authentication/auth.constants';
import { AuthenticationRepositoryInterface } from 'src/authentication/interface/authentication.repository.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface,
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
                role: "USER"
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}