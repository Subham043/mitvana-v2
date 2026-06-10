import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { SUBSCRIPTION_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';
import { SubscriptionCreatedEvent } from '../events/subscription-created.event';
import { SUBSCRIPTION_CREATED_EVENT_LABEL } from '../subscription.constants';

@Injectable()
export class SubscriptionCreatedListener {

    constructor(@InjectQueue(SUBSCRIPTION_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(SUBSCRIPTION_CREATED_EVENT_LABEL)
    async handleSubscriptionCreatedEvent(event: SubscriptionCreatedEvent) {
        this.mailQueue.add(SUBSCRIPTION_CREATED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}