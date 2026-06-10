import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { USER_MAIL_QUEUE } from '../queue.constants';
import { UserMailService } from 'src/mail/services/user_mail.service';
import { USER_CREATED_EVENT_LABEL } from 'src/api/users/user.constants';
import { UserCreatedEvent } from 'src/api/users/events/user-created.event';

@Processor(USER_MAIL_QUEUE)
export class UserQueueConsumer extends WorkerHost {

    constructor(private readonly mailService: UserMailService) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case USER_CREATED_EVENT_LABEL:
                await this.handleUserCreated(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    private async handleUserCreated(data: UserCreatedEvent) {
        await this.mailService.notifyUserCreated(data);
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