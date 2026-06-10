import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { SUBSCRIPTION_MAIL_QUEUE } from '../queue.constants';
import { SubscriptionMailService } from 'src/mail/services/subscription_mail.service';
import { SUBSCRIPTION_CREATED_EVENT_LABEL } from 'src/api/subscription/subscription.constants';
import { SubscriptionCreatedEvent } from 'src/api/subscription/events/subscription-created.event';

@Processor(SUBSCRIPTION_MAIL_QUEUE)
export class SubscriptionQueueConsumer extends WorkerHost {

    constructor(private readonly mailService: SubscriptionMailService) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case SUBSCRIPTION_CREATED_EVENT_LABEL:
                await this.handleSubscriptionCreated(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    private async handleSubscriptionCreated(data: SubscriptionCreatedEvent) {
        await this.mailService.notifySubscriptionCreated(data);
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