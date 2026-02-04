import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigType } from '@nestjs/config';
import redisConfig from 'src/config/schema/redis.config';
import { AuthQueueConsumer } from './consumers/auth_queue.consumer';
import { AccountQueueConsumer } from './consumers/account_queue.consumer';
import { AuthMailService } from 'src/mail/services/auth_mail.service';
import { AccountMailService } from 'src/mail/services/account_mail.service';

@Module({})
export class QueueModule {
    static forRootAsync(): DynamicModule {
        return {
            module: QueueModule,
            imports: [
                BullModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [redisConfig.KEY],
                    useFactory: (config: ConfigType<typeof redisConfig>) => ({
                        connection: {
                            host: config.host as string,
                            port: Number(config.port),
                            password: config.password as string,
                        },
                    }),
                }),
            ],
            exports: [],
            providers: [
                AuthMailService,
                AccountMailService,
                AuthQueueConsumer,
                AccountQueueConsumer
            ],
        };
    }
}