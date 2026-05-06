import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OrderStatusUpdatedEvent } from '../events/order-status-updated';
import { ORDER_STATUS_UPDATED_EVENT_LABEL } from '../order.constant';
import { ORDER_MAIL_QUEUE } from 'src/queue/queue.constants';

@Injectable()
export class OrderStatusUpdatedListener {

    constructor(@InjectQueue(ORDER_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(ORDER_STATUS_UPDATED_EVENT_LABEL)
    async handleOrderStatusUpdatedEvent(event: OrderStatusUpdatedEvent) {
        this.mailQueue.add(ORDER_STATUS_UPDATED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}