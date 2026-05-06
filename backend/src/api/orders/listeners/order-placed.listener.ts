import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OrderPlacedEvent } from '../events/order-placed';
import { ORDER_PLACED_EVENT_LABEL } from '../order.constant';
import { ORDER_MAIL_QUEUE } from 'src/queue/queue.constants';

@Injectable()
export class OrderPlacedListener {

    constructor(@InjectQueue(ORDER_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(ORDER_PLACED_EVENT_LABEL)
    async handleOrderPlacedEvent(event: OrderPlacedEvent) {
        this.mailQueue.add(ORDER_PLACED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}