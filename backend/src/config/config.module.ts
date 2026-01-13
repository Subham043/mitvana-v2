import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import redisConfig from 'src/config/schema/redis.config';
import databaseConfig from 'src/config/schema/database.config';
import appConfig from 'src/config/schema/app.config';
import jwtConfig from 'src/config/schema/jwt.config';
import mailConfig from 'src/config/schema/mail.config';
import { AppConfigValidator } from 'src/config/schema/config.schema';

@Module({})
export class AppConfigModule {
    static forRoot(): DynamicModule {
        return {
            module: AppConfigModule,
            imports: [
                ConfigModule.forRoot({
                    // envFilePath: '.env',
                    expandVariables: true,
                    load: [databaseConfig, appConfig, redisConfig, jwtConfig, mailConfig],
                    isGlobal: true,
                    cache: false,
                    validationSchema: AppConfigValidator
                }),
            ],
            exports: [ConfigModule],
        };
    }
}