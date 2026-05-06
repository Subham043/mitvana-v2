import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { PRODUCT_MAIL_QUEUE } from '../queue.constants';
import { NEW_PRODUCT_PUBLISHED_EVENT_LABEL, PRODUCT_BACK_IN_STOCK_EVENT_LABEL } from 'src/api/products/product.constants';
import { ProductMailService } from 'src/mail/services/product_mail.service';
import { ProductBackInStockEvent } from 'src/api/products/events/product-back-in-stock';
import { NewProductPublishedEvent } from 'src/api/products/events/new-product-published';
import { Inject } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from 'src/api/subscription/subscription.constants';
import { SubscriptionRepositoryInterface } from 'src/api/subscription/interface/subscription.repository.interface';
import { PRODUCT_NOTIFY_REPOSITORY } from 'src/api/product_notifies/product_notify.constants';
import { ProductNotifyRepositoryInterface } from 'src/api/product_notifies/interface/product_notify.repository.interface';
import { normalizePagination } from 'src/utils/pagination/normalize.pagination';

@Processor(PRODUCT_MAIL_QUEUE)
export class ProductQueueConsumer extends WorkerHost {

    constructor(
        private readonly mailService: ProductMailService,
        @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepositoryInterface,
        @Inject(PRODUCT_NOTIFY_REPOSITORY) private readonly productNotifyRepository: ProductNotifyRepositoryInterface,
    ) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case PRODUCT_BACK_IN_STOCK_EVENT_LABEL:
                await this.handleProductBackInStock(job.data);
                break;

            case NEW_PRODUCT_PUBLISHED_EVENT_LABEL:
                await this.handleNewProductPublished(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    // ✅ THIS is where the job data is processed for resending verification code
    private async handleProductBackInStock(data: ProductBackInStockEvent) {
        let offset = 0;

        const batchSize = 50;

        while (true) {
            const rows = await this.productNotifyRepository.getAllEmailByProductId({
                page: 1,
                limit: batchSize,
                offset,
                search: "",
            }, data.product.id);

            if (!rows.length) break

            await Promise.all(
                rows.map(row =>
                    this.mailService.notifyProductBackInStock({
                        ...data,
                        email: row.email,
                    })
                )
            );

            await Promise.all(
                rows.map(row =>
                    this.productNotifyRepository.deleteProductNotify(row.id)
                )
            );

            if (rows.length < batchSize) break
        }
    }

    private async handleNewProductPublished(data: NewProductPublishedEvent) {
        let offset = 0;

        const batchSize = 50;

        while (true) {
            const { page, limit, search: searchString } = normalizePagination({
                page: 1,
                limit: batchSize,
                search: "",
            })
            const rows = await this.subscriptionRepository.getAll({
                page,
                limit,
                offset,
                search: searchString,
            });

            if (!rows.length) break

            await Promise.all(
                rows.map(row =>
                    this.mailService.notifyNewProductPublished({
                        ...data,
                        email: row.email,
                    })
                )
            );

            offset += batchSize

            if (rows.length < batchSize) break
        }
    }

    // ✅ lifecycle event (logging only)
    @OnWorkerEvent('active')
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} [${job.name}]`,
        );
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job) {
        console.log(`Completed job ${job.id}`);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job, err: Error) {
        console.error(`Job ${job.id} failed`, err);
    }

}