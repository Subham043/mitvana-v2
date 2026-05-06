import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { PRODUCT_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';
import { NEW_PRODUCT_PUBLISHED_EVENT_LABEL } from '../product.constants';
import { NewProductPublishedEvent } from '../events/new-product-published';

@Injectable()
export class NewProductPublishedListener {

    constructor(@InjectQueue(PRODUCT_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(NEW_PRODUCT_PUBLISHED_EVENT_LABEL)
    async handleNewProductPublishedEvent(event: NewProductPublishedEvent) {
        this.mailQueue.add(NEW_PRODUCT_PUBLISHED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}