import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { AUTH_MAIL_QUEUE } from '../queue.constants';
import { MailService } from 'src/mail/mail.service';
import { UserResetPasswordRequestEvent } from 'src/api/authentication/events/user-reset-password-request.event';
import { USER_REGISTERED_EVENT_LABEL, USER_RESET_PASSWORD_REQUEST_EVENT_LABEL } from 'src/api/authentication/auth.constants';
import { UserRegisteredEvent } from 'src/api/authentication/events/user-registered.event';

@Processor(AUTH_MAIL_QUEUE)
export class AuthQueueConsumer extends WorkerHost {

    constructor(private readonly mailService: MailService) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case USER_RESET_PASSWORD_REQUEST_EVENT_LABEL:
                await this.handleResetPassword(job.data);
                break;
            case USER_REGISTERED_EVENT_LABEL:
                await this.handleUserRegistered(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    // ✅ THIS is where the job data is processed for reset password request
    private async handleResetPassword(data: UserResetPasswordRequestEvent) {
        await this.mailService.notifyResetPasswordRequest(data);
    }

    // ✅ THIS is where the job data is processed for user registered
    private async handleUserRegistered(data: UserRegisteredEvent) {
        await this.mailService.notifyRegisteredUser(data);
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