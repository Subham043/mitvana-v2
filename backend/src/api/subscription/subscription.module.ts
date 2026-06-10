import { Module } from '@nestjs/common';
import { SubscriptionController } from './controller/subscription.controller';
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION_SERVICE } from './subscription.constants';
import { ISubscriptionService } from './service/subscription.service';
import { ISubscriptionRepository } from './repository/subscription.repository';
import { SubscriptionCreatedListener } from './listeners/subscription-created.listener';
import { BullModule } from '@nestjs/bullmq';
import { SUBSCRIPTION_MAIL_QUEUE } from 'src/queue/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SUBSCRIPTION_MAIL_QUEUE,
    }),
  ],
  controllers: [SubscriptionController],
  providers: [
    {
      provide: SUBSCRIPTION_SERVICE,
      useClass: ISubscriptionService,
    },
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: ISubscriptionRepository,
    },
    SubscriptionCreatedListener,
  ],
})
export class SubscriptionModule { }
