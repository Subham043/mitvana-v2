import { Module } from '@nestjs/common';
import { SubscriptionController } from './controller/subscription.controller';
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION_SERVICE } from './subscription.constants';
import { ISubscriptionService } from './service/subscription.service';
import { ISubscriptionRepository } from './repository/subscription.repository';

@Module({
  imports: [],
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
  ],
})
export class SubscriptionModule { }
