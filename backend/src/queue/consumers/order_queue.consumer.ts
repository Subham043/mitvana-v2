import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ORDER_MAIL_QUEUE } from '../queue.constants';
import { Inject } from '@nestjs/common';
import { OrderMailService } from 'src/mail/services/order_mail.service';
import { USER_REPOSITORY } from 'src/api/users/user.constants';
import { UserRepositoryInterface } from 'src/api/users/interface/user.repository.interface';
import { ORDER_PLACED_EVENT_LABEL, ORDER_STATUS_UPDATED_EVENT_LABEL } from 'src/api/orders/order.constant';
import { OrderPlacedEvent } from 'src/api/orders/events/order-placed';
import { OrderStatusUpdatedEvent } from 'src/api/orders/events/order-status-updated';

@Processor(ORDER_MAIL_QUEUE)
export class OrderQueueConsumer extends WorkerHost {

    constructor(
        private readonly mailService: OrderMailService,
        @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryInterface,
    ) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case ORDER_PLACED_EVENT_LABEL:
                await this.handleOrderPlaced(job.data);
                break;

            case ORDER_STATUS_UPDATED_EVENT_LABEL:
                await this.handleOrderStatusUpdated(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    // ✅ THIS is where the job data is processed for resending verification code
    private async handleOrderPlaced(data: OrderPlacedEvent) {
        if (data.order.user) {
            const user = await this.userRepository.getById(data.order.user.id)
            if (user) {
                await this.mailService.notifyOrderPlaced({
                    ...data,
                    email: user.email,
                    name: user.name,
                })
            }
        }
    }

    // ✅ THIS is where the job data is processed for resending verification code
    private async handleOrderStatusUpdated(data: OrderStatusUpdatedEvent) {
        if (data.order.user) {
            const user = await this.userRepository.getById(data.order.user.id)
            if (user) {
                await this.mailService.notifyOrderStatusUpdated({
                    ...data,
                    email: user.email,
                    name: user.name,
                })
            }
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