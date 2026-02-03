import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategy/access_token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh_token.strategy';
import jwtConfig from 'src/config/schema/jwt.config';
import { AUTHENTICATION_REPOSITORY } from 'src/api/authentication/auth.constants';
import { IAuthenticationRepository } from 'src/api/authentication/repository/authentication.repository';
import { AuthService } from './auth.service';

@Global() // ✅ makes it available everywhere
@Module({})
export class AuthModule {
    static register(): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [jwtConfig.KEY],
                    useFactory: (config: ConfigType<typeof jwtConfig>) => ({
                        secret: config.secret,
                        signOptions: { expiresIn: Number(config.expiry) as unknown as number },
                    })
                }),
            ],
            providers: [
                AuthService,
                AccessTokenStrategy,
                RefreshTokenStrategy,
                JwtService,
                {
                    provide: AUTHENTICATION_REPOSITORY,
                    useClass: IAuthenticationRepository,
                },
            ],
            exports: [
                AuthService,
                JwtService,
            ],
        };
    }
}