import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigType } from '@nestjs/config';
import redisConfig from 'src/config/schema/redis.config';
import { AuthQueueConsumer } from './consumers/auth_queue.consumer';
import { AccountQueueConsumer } from './consumers/account_queue.consumer';
import { AuthMailService } from 'src/mail/services/auth_mail.service';
import { AccountMailService } from 'src/mail/services/account_mail.service';
import { ProductMailService } from 'src/mail/services/product_mail.service';
import { ProductQueueConsumer } from './consumers/product_queue.consumer';
import { SUBSCRIPTION_REPOSITORY } from 'src/api/subscription/subscription.constants';
import { ISubscriptionRepository } from 'src/api/subscription/repository/subscription.repository';
import { PRODUCT_NOTIFY_REPOSITORY } from 'src/api/product_notifies/product_notify.constants';
import { IProductNotifyRepository } from 'src/api/product_notifies/repository/product_notify.repository';

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
                ProductMailService,
                AuthQueueConsumer,
                AccountQueueConsumer,
                ProductQueueConsumer,
                {
                    provide: SUBSCRIPTION_REPOSITORY,
                    useClass: ISubscriptionRepository,
                },
                {
                    provide: PRODUCT_NOTIFY_REPOSITORY,
                    useClass: IProductNotifyRepository,
                },
            ],
        };
    }
}