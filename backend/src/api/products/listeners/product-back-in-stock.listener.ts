import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductBackInStockEvent } from '../../products/events/product-back-in-stock';
import { InjectQueue } from '@nestjs/bullmq';
import { PRODUCT_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';
import { PRODUCT_BACK_IN_STOCK_EVENT_LABEL } from '../product.constants';

@Injectable()
export class ProductBackInStockListener {

    constructor(@InjectQueue(PRODUCT_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(PRODUCT_BACK_IN_STOCK_EVENT_LABEL)
    async handleProductBackInStockEvent(event: ProductBackInStockEvent) {
        this.mailQueue.add(PRODUCT_BACK_IN_STOCK_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}