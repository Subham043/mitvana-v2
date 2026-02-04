import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import redisConfig from 'src/config/schema/redis.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule as CacheModuleCore } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

@Module({})
export class CacheModule {
    static registerAsync(): DynamicModule {
        return {
            module: CacheModule,
            imports: [
                CacheModuleCore.registerAsync({
                    imports: [ConfigModule],
                    inject: [redisConfig.KEY],
                    useFactory: (config: ConfigType<typeof redisConfig>) => ({
                        isGlobal: true,
                        stores: [
                            new Keyv({
                                store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
                            }),
                            new KeyvRedis(config.url),
                        ],
                    }),
                }),
            ],
            exports: [CacheModuleCore],
            providers: [
                {
                    provide: APP_INTERCEPTOR,
                    useClass: CacheInterceptor,
                },
            ],
        };
    }
}