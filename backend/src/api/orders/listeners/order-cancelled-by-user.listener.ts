import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OrderCancelledByUserEvent } from '../events/order-cancelled-by-user';
import { ORDER_CANCELLED_BY_USER_EVENT_LABEL } from '../order.constant';
import { ORDER_MAIL_QUEUE } from 'src/queue/queue.constants';

@Injectable()
export class OrderCancelledByUserListener {

    constructor(@InjectQueue(ORDER_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(ORDER_CANCELLED_BY_USER_EVENT_LABEL)
    async handleOrderCancelledByUserEvent(event: OrderCancelledByUserEvent) {
        this.mailQueue.add(ORDER_CANCELLED_BY_USER_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}