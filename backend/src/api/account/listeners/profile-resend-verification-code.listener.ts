import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL } from '../account.constants';
import { ProfileResendVerificationCodeEvent } from '../events/profile-resend-verification-code.event';
import { InjectQueue } from '@nestjs/bullmq';
import { ACCOUNT_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';

@Injectable()
export class ProfileResendVerificationCodeListener {

    constructor(@InjectQueue(ACCOUNT_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL)
    async handleProfileResendVerificationCodeEvent(event: ProfileResendVerificationCodeEvent) {
        this.mailQueue.add(PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}