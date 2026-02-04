import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ACCOUNT_MAIL_QUEUE } from '../queue.constants';
import { AccountMailService } from 'src/mail/services/account_mail.service';
import { PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL } from 'src/api/account/account.constants';
import { ProfileResendVerificationCodeEvent } from 'src/api/account/events/profile-resend-verification-code.event';

@Processor(ACCOUNT_MAIL_QUEUE)
export class AccountQueueConsumer extends WorkerHost {

    constructor(private readonly mailService: AccountMailService) {
        super()
    }

    // ✅ THIS is where the job is processed
    async process(job: Job): Promise<void> {
        switch (job.name) {
            case PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL:
                await this.handleResendVerificationCode(job.data);
                break;

            default:
                throw new Error(`Unknown job type: ${job.name}`);
        }
    }

    // ✅ THIS is where the job data is processed for resending verification code
    private async handleResendVerificationCode(data: ProfileResendVerificationCodeEvent) {
        await this.mailService.notifyResendVerificationCode(data);
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